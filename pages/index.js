import { MongoClient } from "mongodb";
import { Inter } from "next/font/google";
import MeetupList from "@/components/meetups/MeetupList";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups Manager made with NextJs</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <div className={inter.className}>
        <h1>All Meetups</h1>
        <MeetupList meetups={props.data} />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cyz4zgh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  let client;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    console.log(error);
    return;
  }
  let meetups;

  try {
    const db = client.db(process.env.monngodb_database);
    meetups = await db.collection("meetups").find().toArray();
  } catch (error) {
    return;
  } finally {
    client.close();
  }

  return {
    props: {
      data: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 30,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return { props: { data: DUMMY_MEETUPS } };
// }
