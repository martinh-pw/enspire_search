// Saves options to chrome.storage
function save_options() {
  var s1 = document.getElementById('search_am').checked;
  var s2 = document.getElementById('search_task').checked;
  var s3 = document.getElementById('search_fin').checked;

  chrome.storage.sync.set({
    search_am: s1,
    search_task: s2,
    search_fin: s3
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Defaults as 0
  chrome.storage.sync.get({
    search_am: false,
    search_task: false,
    search_fin: false
  }, function(items) {
    document.getElementById('search_am').checked = items.search_am;
    document.getElementById('search_task').checked = items.search_task;
    document.getElementById('search_fin').checked = items.search_fin;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

