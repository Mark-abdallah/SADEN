
$(document).ready(function() {
   

    var url = window.location.href;
    var urlParams = new URLSearchParams(window.location.search);

    var id = urlParams.get('id');

    


    const serviceDetails = {
        $serviceName: $('.serviceName'),
        $serviceDescription: $('#serviceDescription'),
        $serviceSubServices: $('#serviceSub'), // Bind the jQuery object to HTML element
        $serviceImageUrl: $('#serviceImageUrl'), // Bind the jQuery object
        $notableProjects: $('.notable_projects'), // Bind the jQuery object
        $importantDevices: $('.important_devices'), // Bind the jQuery object
        
        
        updateService(id) {
            let serviceDetailsObj = getServiceByServiceId(id)
            this.$serviceName.attr('data-translate',serviceDetailsObj.serviceName);
            this.$serviceDescription.attr('data-translate',serviceDetailsObj.serviceDescription);
            this.$serviceImageUrl.attr('src',serviceDetailsObj.serviceImageUrl);

            this.$serviceSubServices.empty();
            serviceDetailsObj.serviceSubServices.forEach(subService => {
                const li = $('<li></li>'); // Create a new <li> element
                const icon = $('<i class="bi bi-check-circle m-2"></i>'); // Create the icon element
                const span = $('<span></span>').attr('data-translate', subService ); // Create the <span> with the subService text
                li.append(icon); // Append the icon to the <li>
                li.append(span); // Append the <span> to the <li>
                this.$serviceSubServices.append(li); // Append the <li> to the <ul>
            });
            this.$notableProjects.empty();
            if(serviceDetailsObj.notableProjects){
                serviceDetailsObj.notableProjects.forEach(project => {
                    const projectDiv = $('<div class="col-sm-3 d-flex notable_projects_container m-2"></div>');
                    const projectLink = $('<a></a>').attr('href', `#`);
                    const projectImg = $('<img class="img-fluid project-img shadow-lg">').attr('src', project.imageUrl).attr('alt', project.name);
                    const projectTitle = $('<span class="text-black"></span>').attr('data-translate',project.name);
                    
                    projectLink.append(projectImg).append(projectTitle); // Bind image and title inside link
                    projectDiv.append(projectLink); // Add the link to the project div
        
                    this.$notableProjects.append(projectDiv);
                })
            }
            
            this.$importantDevices.empty();
            if(serviceDetailsObj.importantDevices){
                serviceDetailsObj.importantDevices.forEach(project => {
                    const projectDiv = $('<div class="col-sm-3 d-flex notable_projects_container m-2"></div>');
                    const projectLink = $('<a></a>').attr('href', `ProjectLink.html?id=${project.id}`);
                    const projectImg = $('<img class="img-fluid project-img shadow-lg">').attr('src', project.imageUrl).attr('alt', project.name);
                    const projectTitle = $('<span class="text-black"></span>').attr('data-translate',project.name);
                    
                    projectLink.append(projectImg).append(projectTitle); // Bind image and title inside link
                    projectDiv.append(projectLink); // Add the link to the project div
        
                    this.$importantDevices.append(projectDiv);
                })
            }
            
            if(!(serviceDetailsObj.notableProjects&&serviceDetailsObj.notableProjects.length>0)) {
                $('#projects').hide()
            }else{
                $('#devcies').hide()
            }
        },
    };
    serviceDetails.updateService(id)

    
});


