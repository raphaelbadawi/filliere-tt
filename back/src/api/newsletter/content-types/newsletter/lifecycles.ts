export default {
  afterUpdate(event) {
    const { result } = event;
    if (!result.publishedAt) {
      return;
    }
    // the newsletter was just published or was modified after publication
    /** @todo finish nextjs api endpoint then make here a call to this api */
  },
};
