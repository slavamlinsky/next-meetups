import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(eneteredMeetupData) {
    console.log(eneteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(eneteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Adding new Meetup.</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities!"
        />
      </Head>
      <div>
        <h1>Adding New Meetup</h1>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </div>
    </>
  );
}

export default NewMeetupPage;
