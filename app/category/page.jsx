import React from "react";


async function page() {
  const data = await getMovieByCategory();
  return <div>Category</div>;
}

export default page;
