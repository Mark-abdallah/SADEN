$(document).ready(function() {
    const $portfolioContainer = $('.portfolio-container'); // Select the container
    

    projects.forEach(item => {
        const portfolioItemHTML = `
            <div class="col-lg-4 col-md-6 col-sm-10 portfolio-item filter-${getKeyByValue(ServicesEnum,item.serviceId)}">
                <div class="portfolio-content h-100">
                    <img src="${item.imageUrl}" class="img-fluid project-img h-100" alt="${item.name}">
                    <div class="portfolio-info">
                        <h4 data-translate="${item.name}">${item.name}</h4>
                    </div>
                </div>
            </div>
        `;

        // Append the constructed HTML to the portfolio container
        $portfolioContainer.append(portfolioItemHTML);
    });
});
