chrome.omnibox.setDefaultSuggestion({
    description: 'Enter text to search Northern Enspire'
});

chrome.omnibox.onInputEntered.addListener((text, OnInputEnteredDisposition) => {
    // Check user settings and run search
    chrome.storage.sync.get({
        search_am: false,
        search_task: false,
        search_fin: false
    }, function(items) {

        // Default search
        objs = [
            "Client_Model_Entity",
            "Project_Model_Addon",
            "Project_Model_Credentials",
            "Project_Model_Entity",
            "Website_Model_Entity",
            "Storage_Model_Entity"
            ];

        // AM search
        if (items.search_am) {
            objs.push("Lead_Model_Entity");
            objs.push("Proposal_Model_Entity");
            objs.push("Sop_Model_Entity");
        }

        // Task search
        if (items.search_task) {
            objs.push("Project_Model_Subtask");
            objs.push("Project_Model_Task");
            objs.push("Project_Model_Task_Comment");
        }
        // Finance search
        if (items.search_fin) {
            objs.push("Invoice_Model_Entity");
            objs.push("Invoice_Model_Entity_Line");
            objs.push("Project_Model_Budget_Time");
        }

        my_url = "https://northern.enspire.ca/search/index/index/?term="+ text;
        objs.forEach(function(item) {
            my_url += "&model_class%5B%5D="+ item;
        });

        chrome.tabs.update({url: my_url});
    });
});
