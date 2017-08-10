const functions = require('firebase-functions');

// Remove list items when list is deleted.
exports.onListDeleted = functions.database.ref('/lists/{listId}')
  .onDelete(event => {
    // Remove list items.
    event.data.adminRef.root.child(`/items/${event.params.listId}`).remove();
  });
