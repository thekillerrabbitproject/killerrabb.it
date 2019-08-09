/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// https://stackoverflow.com/questions/57188179/show-overlay-only-once-on-page-entrance-not-route-change-howto
 exports.onInitialClientRender = () => {
  setTimeout(function() {
    document.getElementById("___loader").style.display = "none"
  }, 500)
}