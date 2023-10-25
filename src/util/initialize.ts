export async function initialize() {
  // Set proper title for page
  document.title = "Waters CMS Admin";

  try {
    // Create Waters-Cms folder in project GitHub if not exists.
    // TODO: Update to use settings base url
    await fetch(`http://localhost:4321/waters-cms/api/initialize`);
  } catch (error) {
    console.error("🚀 ~ file: initialize.ts:10 ~ initialize ~ error:", error);
  }

  console.debug("Waters CMS initialized!");
}
