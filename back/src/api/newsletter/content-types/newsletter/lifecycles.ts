export default {
  async afterCreate(event) {
    const { result } = event;
    if (!result.publishedAt) {
      return;
    }

    // the newsletter was just published or was modified after publication
    await fetch(
      `http://${process.env.NEXT_DOCKER_NETWORK_ENDPOINT}/api/newsletter`,
      { 
        method: "POST",
        body: JSON.stringify({
          jwt: process.env.ADMIN_JWT_SECRET,
          content: result.content,
        })
      }
    );
  },
};
