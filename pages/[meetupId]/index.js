import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetail
        id={props.meetupData.id}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cyz4zgh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  let client;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    console.log(error);
    return;
  }
  let selectedMeetup;
  const objId = new ObjectId(meetupId);

  const db = client.db(process.env.monngodb_database);
  selectedMeetup = await db.collection("meetups").findOne({ _id: objId });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export async function getStaticPaths(context) {
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
    meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();
  } catch (error) {
    return;
  } finally {
    client.close();
  }

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
}

export default MeetupDetails;
