$(document).ready(function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2FiZGFsYWgiLCJhIjoiY20xbWpoNTk5MGhuMTJpcXR5NGJocjZ3eSJ9.1a0FXJTLfZ1npTTu-N323A';
    const branchLocations = [
        { name: 'Jada Branch', coords: [39.237402, 21.552336] },
        { name: 'Maka brach', coords: [39.967289, 21.462635] },
        { name: 'taif Branch', coords: [40.453389, 21.348311] },
        { name: 'el-madina el monawara Branch', coords: [39.694371, 24.502044] },
        { name: 'al-kosayem Branch', coords: [43.952185, 26.361112] },
        { name: 'haiel Branch', coords: [41.687953, 27.524177] },
        { name: 'Tabouk Branch', coords: [41.687953, 27.524177] },
        { name: 'Riyahd Branch', coords: [46.788006, 24.742172] },
        { name: 'khames masheet Branch', coords: [42.726581, 18.335424] },
        { name: 'Jazan Branch', coords: [42.564717, 16.891728] },
        { name: 'Besha Branch', coords: [42.599746, 19.985025] },
        { name: 'Sakaka Branch', coords: [40.196352, 29.964209] },
        { name: 'Al-Damam Branch', coords: [50.119191, 26.438510] },
        { name: 'hafr Al-baten Branch', coords: [45.96689778799614, 28.433401373826317] },
        { name: 'Cairo, Egypt Branch', coords: [31.341389, 30.049564] },
    ];
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [45.0792, 23.8859], // Center on Saudi Arabia
        zoom: 4
    });
    // Custom icon URL
    const customIconUrl = 'assets/img/logo.png'; // Replace with your icon URL

    // Loop through each branch and add a marker
    branchLocations.forEach(branch => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        // Set the size of the marker
        markerElement.style.width = '2.5vw'; // Adjust width
        markerElement.style.height = '2.5vw'; // Adjust height

        // Set the background properties
        markerElement.style.backgroundImage = `url(${customIconUrl})`;
        markerElement.style.backgroundSize = 'contain'; // Make sure the image is fully visible within the circle
        markerElement.style.backgroundRepeat = 'no-repeat'; // Prevent the image from repeating
        markerElement.style.backgroundPosition = 'center'; // Center the image

        // Additional styles to create a circular appearance
        markerElement.style.backgroundColor = 'white'; // Background color of the marker
        markerElement.style.borderRadius = '50%'; // Make the image rounded
        markerElement.style.border = '3px solid rgb(173, 37, 22)'; // Red border
        markerElement.style.display = 'flex'; // Use flexbox for centering
        markerElement.style.justifyContent = 'center'; // Center horizontally
        markerElement.style.alignItems = 'center'; // Center vertically


        new mapboxgl.Marker(markerElement)
            .setLngLat(branch.coords)
            .setPopup(new mapboxgl.Popup().setHTML(`<h4>${branch.name}</h4>`)) // Optional: add a popup with the branch name
            .addTo(map);
    });
    const branchesData =[
        {
            name: "jada_branch",
            address: "jada_address",
            phone: "00966551706008",
            email: "jd@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=21.552280144012897, 39.23740527590339"
        },
        {
            name: "mecca_branch",
            address: "mecca_address",
            phone: "00966568649219",
            email: "mc@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=21.46282751521347, 39.9673224668048"
        },
        {
            name: "taif_branch",
            address: "taif_address",
            phone: "00966555446974",
            email: "tf@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=21.35821765641219, 40.46137512447157"
        },
        {
            name: "medina_branch",
            address: "medina_address",
            phone: "00966550331614",
            email: "md@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=24.44728443317785, 39.64534949572878"
        },
        {
            name: "qassim_branch",
            address: "qassim_address",
            phone: "00966555773192",
            email: "qs@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=26.36092317408667, 43.95197378229638"
        },
        {
            name: "hail_branch",
            address: "hail_address",
            phone: "00966553095052",
            email: "hl@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=27.524258536556253, 41.68805405350174"
        },
        {
            name: "tabuk_branch",
            address: "tabuk_address",
            phone: "00966553095052",
            email: "tb@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=28.395644316819087, 36.581681224697995"
        },
        {
            name: "baha_branch",
            address: "baha_address",
            phone: "00966533447168",
            email: "bh@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=20.034615015086878, 41.48413876676598"
        },
        {
            name: "riyadh_branch",
            address: "riyadh_address",
            phone: "00966555447647",
            email: "rd@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=24.780201598957568, 46.81039609573928"
        },
        {
            name: "khamis_branch",
            address: "khamis_address",
            phone: "00966558304834",
            email: "khm@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=18.33581118909235, 42.726537495558276"
        },
        {
            name: "jazan_branch",
            address: "jazan_address",
            phone: "00966555449135",
            email: "jz@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=16.89174523803875, 42.564712880185155"
        },
        {
            name: "bisha_branch",
            address: "bisha_address",
            phone: "00966555779364",
            email: "bsh@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=19.9996,42.6256"
        },
        {
            name: "sakaka_branch",
            address: "sakaka_address",
            phone: "00966564542732",
            email: "sk@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=29.964365233729193, 40.19652578242635"
        },
        {
            name: "dammam_branch",
            address: "dammam_address",
            phone: "00966550421612",
            email: "dam@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=26.423123393293746, 50.114230538123984"
        },
        {
            name: "hafr_al_batin_branch",
            address: "hafr_al_batin_address",
            phone: "00966564581722",
            email: "hfb@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=28.4322,45.9703"
        },
        {
            name: "cairo_branch",
            address: "cairo_address",
            phone: "00201145189645",
            email: "cairo@saden.sa",
            googleMapsLink: "https://maps.google.com/?q=30.049744206967468, 31.341384367090193"
        }

    ]

    // Construct the branch HTML structure
    for (let index = 0; index < branchesData.length; index++) {
        const branch = branchesData[index];
        let branchHTML = `
        <div class="col-lg-4 col-md-6 rounded-3" data-aos="fade-up" data-aos-delay="100">
        <div class="service-item  position-relative">
            <h3 data-translate="${branch.name}">${branch.name}</h3>
            <p class="p-2"><i class="bi bi-geo-alt-fill m-1"></i> <span class="" data-translate="branch_address"></span>: <span data-translate="${branch.address}"></span> </p>
            <p class="p-2"><i class="bi bi-telephone m-1" ></i><span data-translate="branch_phone_number"></span>${" : " +branch.phone}</p>
            <p class="p-2"><i class="bi bi-envelope m-1"></i>  <a href="mailto:${branch.email}" data-translate="branch_email"></a><span>${" : " + branch.email}</span></p>
            <p class="p-2"><i class="bi bi-map m-1"></i> <a href="${branch.googleMapsLink}" target="_blank" data-translate= "branch_location">موقع الفرع</a></p>
        </div>
        </div>
    `;
    
    $('#branches_container').append(branchHTML);
    }
})