app.service("Notify", ['ngDialog', 
    function(ngDialog){
        this.openModal = (template, data, width) =>{
            return ngDialog.open({
                template: template,
                data: data,
                width: width 
            });
        }
    }
])