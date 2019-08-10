/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// https://stackoverflow.com/questions/57188179/show-overlay-only-once-on-page-entrance-not-route-change-howto
 exports.onInitialClientRender = () => {
  if (process.env.NODE_ENV === 'production') {
    setTimeout(function() {
      document.getElementById("___splashscreen").style.display = "none"
    }, 500)
  }
}