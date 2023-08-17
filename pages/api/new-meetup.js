import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cyz4zgh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    let client;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      console.log(error);
      return;
    }

    const newMeetup = data;

    try {
      const db = client.db(process.env.monngodb_database);
      const result = await db.collection("meetups").insertOne(newMeetup);
      newMeetup.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Saving meetup failed." });
      return;
    } finally {
      client.close();
    }

    res
      .status(201)
      .json({ message: "Meetup successfully added!", meetup: newMeetup });
  }
}
