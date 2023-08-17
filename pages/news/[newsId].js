import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId;
  return (
    <div>
      <h1>DetailPage</h1>
      <h2>{newsId}</h2>
    </div>
  );
}

export default DetailPage;
