
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  setTimeout(function(){
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            console.log("Toggle Clicked"); // Debugging
            mobileNavToggle();
        });
    });

    function mobileNavToggle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavShow.classList.toggle('d-none');
        mobileNavHide.classList.toggle('d-none');
    }
    console.log("Toggle Clicked"); // Debugging
},1000)

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function (el) {
        el.addEventListener('click', function () {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function loadLanguage(lang) {
   if(!lang){
     lang = localStorage.getItem("selectedLanguage")
   }
    fetch(`/translation/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        document.querySelectorAll('[data-translate]').forEach(element => {
          const key = element.getAttribute('data-translate');
          if (data[key]) {
            element.innerHTML = data[key];
            element.setAttribute('dir', lang === 'arabic' ? 'rtl' : 'ltr');
          }
        });
        const isArabic = lang === 'arabic';
        
        // Update the document attributes
        document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', isArabic ? 'ar' : 'en');
        
        // Change the font based on the language
        document.documentElement.setAttribute('data-lang', isArabic ? 'arabic' : 'en');
      })
      .catch(error => console.error('Error loading translation:', error));
}
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
    
   
  
    //loading header
    fetch('components/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
        document.getElementById('languageSwitcher').addEventListener('change', function () {
          const selectedLanguage = this.value;
          localStorage.setItem('selectedLanguage', selectedLanguage)
          loadLanguage(selectedLanguage);
        });

        let selectedLanguage = localStorage.getItem("selectedLanguage")
        if(!selectedLanguage){
          document.getElementById('languageSwitcher').value = 'english';
          loadLanguage('english');
        }else{
          loadLanguage(selectedLanguage);
          document.getElementById('languageSwitcher').value = selectedLanguage;

        }
      });

    // Load Footer
    fetch('components/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
      let selectedLanguage = localStorage.getItem("selectedLanguage")
      if(!selectedLanguage){
        loadLanguage('english')
      }else{
        loadLanguage(selectedLanguage)
      }
  }
  window.addEventListener('load', () => {
    aos_init();
    loadPartners();
  });

  function loadPartners() {
    var partners = [
      { src: "assets/img/partners/partner-1.png", alt: "partner-1" },
      { src: "assets/img/partners/partner-2.png", alt: "partner-2" },
      { src: "assets/img/partners/partner-3.png", alt: "partner-3" },
      { src: "assets/img/partners/partner-4.png", alt: "partner-4" },
      { src: "assets/img/partners/partner-5.png", alt: "partner-5" },
      { src: "assets/img/partners/partner-6.png", alt: "partner-6" },
      { src: "assets/img/partners/partner-7.png", alt: "partner-7" },
      { src: "assets/img/partners/partner-8.png", alt: "partner-8" },
      { src: "assets/img/partners/partner-9.png", alt: "partner-9" },
      { src: "assets/img/partners/partner-10.png", alt: "partner-10" },
      // { src: "assets/img/partners/partner-11.png", alt: "partner-11" },
      { src: "assets/img/partners/partner-12.png", alt: "partner-12" },
      { src: "assets/img/partners/partner-13.png", alt: "partner-13" },
      { src: "assets/img/partners/partner-14.png", alt: "partner-14" },
      { src: "assets/img/partners/partner-15.png", alt: "partner-15" },
      { src: "assets/img/partners/partner-16.png", alt: "partner-16" },
      { src: "assets/img/partners/partner-17.png", alt: "partner-17" },
      { src: "assets/img/partners/partner-18.png", alt: "partner-18" },
      { src: "assets/img/partners/partner-19.png", alt: "partner-19" },
      { src: "assets/img/partners/partner-20.png", alt: "partner-20" },
      { src: "assets/img/partners/partner-21.png", alt: "partner-21" },
      { src: "assets/img/partners/partner-22.png", alt: "partner-22" },
      { src: "assets/img/partners/partner-23.png", alt: "partner-23" },
      { src: "assets/img/partners/partner-24.png", alt: "partner-24" },
      { src: "assets/img/partners/partner-25.png", alt: "partner-25" },
      { src: "assets/img/partners/partner-26.png", alt: "partner-26" },
      { src: "assets/img/partners/partner-27.png", alt: "partner-27" },
      { src: "assets/img/partners/partner-28.png", alt: "partner-28" },
      { src: "assets/img/partners/partner-29.png", alt: "partner-29" },
      { src: "assets/img/partners/partner-30.png", alt: "partner-30" },
      { src: "assets/img/partners/partner-31.png", alt: "partner-31" },
      { src: "assets/img/partners/partner-32.webp", alt: "partner-32" },
      { src: "assets/img/partners/partner-33.png", alt: "partner-33" },
      { src: "assets/img/partners/partner-34.png", alt: "partner-34" },
      { src: "assets/img/partners/partner-35.png", alt: "partner-35" },
      { src: "assets/img/partners/partner-36.png", alt: "partner-36" },
      { src: "assets/img/partners/partner-37.png", alt: "partner-37" },
      { src: "assets/img/partners/partner-38.png", alt: "partner-38" },
      { src: "assets/img/partners/partner-39.png", alt: "partner-39" },
      { src: "assets/img/partners/partner-40.png", alt: "partner-40" },
      { src: "assets/img/partners/partner-41.png", alt: "partner-41" },
      { src: "assets/img/partners/partner-42.png", alt: "partner-42" },
      { src: "assets/img/partners/partner-43.png", alt: "partner-43" },
      { src: "assets/img/partners/partner-44.png", alt: "partner-44" },
      { src: "assets/img/partners/partner-45.png", alt: "partner-45" },
      { src: "assets/img/partners/partner-46.png", alt: "partner-46" },
      { src: "assets/img/partners/partner-47.png", alt: "partner-47" },
      { src: "assets/img/partners/partner-48.png", alt: "partner-48" },
      { src: "assets/img/partners/partner-49.png", alt: "partner-49" },
      // { src: "assets/img/partners/partner-50.png", alt: "partner-50" },
      { src: "assets/img/partners/partner-51.png", alt: "partner-51" },
      { src: "assets/img/partners/partner-52.png", alt: "partner-52" }
    ];

    for (let index = 0; index < partners.length; index++) {
      const partner = partners[index];
      $('#partnersSection').append(
        `<img src="${partner.src}" class="partners-img col-lg-3 col-md-4 " alt="${partner.alt}">`
      );
    }
  }
  function getServiceByServiceId(serviceId) {
    if (serviceId == ServicesEnum.GEOTECHNICAL_STUDIES) {
      return {
        serviceName: "geotechnical_studies",
        serviceDescription: "geotechnical_description_full",
        serviceSubServices: [
          "Site_investigation",
          "Soil_Exploration",
          "Foundation_Recommendations",
          "Slope_Stability_Analysis",
          "Soil_Stabilization",
          "Water_infiltration",
          "Geotechnical_Instrumentation_and_Monitoring"
        ],
        serviceImageUrl: "assets/img/services-details/geothechnicalStudies.jpg",
        notableProjects: getProjectsByServiceId(ServicesEnum.GEOTECHNICAL_STUDIES)
      }

    } else if (serviceId == ServicesEnum.HYDROLOGICAL_STUDIES) {
      return {
        serviceName: "hydrological_studies",
        serviceDescription: "hydrological_description_full",
        serviceSubServices: [
          "Flood_Risk_Mapping",
          "Flood_Hazard_Evaluation",
          "Hydraulic_and_Hydrological_Modeling",
          "Floodplain_Management_and_Zoning",
          "Flood_Emergency_Response_Planning",
          "Flood_Hazard_Impact_Assessment"
        ],
        serviceImageUrl: "assets/img/services-details/hydrologicalStudies.webp",
        notableProjects: getProjectsByServiceId(ServicesEnum.HYDROLOGICAL_STUDIES)
      };
    } else if (serviceId == ServicesEnum.GEOPHYSICAL_STUDIES) {
      return {
        serviceName: "geophysical_studies",
        serviceDescription: "geophysical_description_full",
        serviceSubServices: [
          "GROUND_PENETRATING_RADAR",
          "SISMIC_SURVAEY",
          "PIPELINES_AND_CABLES_LOCATOR",
          "ELECTRICAL_RESISITIVIVTY_TOMOGRAPHY",
        ],
        serviceImageUrl: "assets/img/services-details/geophysicalStudies.jpeg",
        notableProjects: getProjectsByServiceId(ServicesEnum.GEOPHYSICAL_STUDIES)
      }
    } else if (serviceId == ServicesEnum.GEOLOGICAL_STUDIES) {
      return {
        serviceName: "geological_studies",
        serviceDescription: "geological_description_full",
        serviceSubServices: [
          "GEOLOGICAL_SURVEYS",
          "ENVIRONMENTAL_SITE_ASSESSMENTS",
          "MINERAL_EXPLORATION",
          "GEOLOGICAL_MODELING_AND_DATA_ANALYSIS",
          "HYDROGEOLOGICAL_STUDIES",
          "GEOLOGICAL_HAZARD_ASSESSMENTS",
        ],
        serviceImageUrl: "assets/img/services-details/geologicalStudies.jpg",
        notableProjects: getProjectsByServiceId(ServicesEnum.GEOLOGICAL_STUDIES)
      }
    } else if (serviceId == ServicesEnum.MINING_STUDIES) {
      return {
        serviceName: "mining_studies",
        serviceDescription: "mining_description_full",
        serviceSubServices: [
          "EXPLORATION_SERVICES",
          "MINING_EQUIPMENT_AND_TECHNOLOGY_SERVICES",
          "MINES_PLANNING_AND_DESIGN",
          "MINES_OPERATIONS_AND_MANAGEMENT_STUDIES",
          "ENVIRONMENTAL_AND_SOCIAL_IMPACT_ASSESSMENTS",
          "MINES_CLOSURE_PLANNING_STUDIES",
          "MINERAL_PROCESSING_AND_SERVICES_STUDIES",
        ],
        serviceImageUrl: "assets/img/services-details/minigStudies.jpg",
        notableProjects: getProjectsByServiceId(ServicesEnum.MINING_STUDIES)
      }
    } else if (serviceId == ServicesEnum.SURVEYING_WORKS) {
      return {
        serviceName: "surveying",
        serviceDescription: "surveying_description_full",
        serviceSubServices: [
          "LAND_SURVEYING",
          "TOPOGRAPHIC_SURVEYING",
          "GEODETIC_SURVEYING",
          "FACILITY_SURVEYING",
          "SUBDIVISION_SURVEYING",
          "HYDROGRAPHIC_SURVEYING",
          "BOUNDARY_SURVEYING",
          "MONITORING_AND_DEFORMATION_SURVEYS",
        ],
        serviceImageUrl: "assets/img/services-details/surveyingServies.png",
        notableProjects: getProjectsByServiceId(ServicesEnum.SURVEYING_WORKS)
      }
    } else if (serviceId == ServicesEnum.MATERIAL_QUALITY_TESTING) {
      return {
        serviceName: "material_quality_testing",
        serviceDescription: "material_quality_description_full",
        serviceSubServices: [
          "soil_stabilization_tests",
          "industrial_building_materials_testing",
          "aggregate_tests",
          "waterproofing_tests"
        ],
        serviceImageUrl: "assets/img/services-details/Quality-Control-of-Piles.png",
        importantDevices: [
          {
            id: 11,
            name: "cbr_testing_apparatus",
            imageUrl: "assets/img/Projects/device_1_1.JPG"
          },
          {
            id: 12,
            name: "direct_shear_apparatus",
            imageUrl: "assets/img/Projects/device_1_2.jpg"
          },
          {
            id: 13,
            name: "consolidation_test_apparatus",
            imageUrl: "assets/img/Projects/device_1_3.jpg"
          },
          {
            id: 14,
            name: "los_angeles_abrasion_testing_apparatus",
            imageUrl: "assets/img/Projects/device_1_4.jpg"
          }
        ]
      }
    } else if (serviceId == ServicesEnum.CONCRETE_TESTING) {
      return {
        serviceName: "materialQualityTesting",
        serviceDescription: "CONCRETE_TESTING_INTRO",
        serviceSubServices: [
          "COMPRESSIVE_STRENGTH_TEST",
          "DENSITY_TEST",
          "SLUMP_TEST",
          "AIR_CONTENT_TEST"
        ],
        serviceImageUrl: "assets/img/services-details/concrete_test.png",
        notableProjects: [],
        importantDevices: [
          {
            id: 12,
            name: "core_cutter_machine",
            imageUrl: "assets/img/Projects/device_2_1.JPG"
          },
          {
            id: 13,
            name: "concrete_compression_testing_machine",
            imageUrl: "assets/img/Projects/device_2_2.JPG"
          },
          {
            id: 14,
            name: "curing_tank_for_concrete_samples",
            imageUrl: "assets/img/Projects/device_2_3.JPeG"
          },
          {
            id: 15,
            name: "specific_gravity_apparatus",
            imageUrl: "assets/img/Projects/device_2_4.JPG"
          }
        ]
      }
    } else if (serviceId == ServicesEnum.ASPHALT_TESTING) {
      return {
        serviceName: "asphalt_testing",
        serviceDescription: "ASPHALT_TESTING_INTRO",
        serviceSubServices: [
          "ASPHALT_BONDING_TEST",
          "DAILY_QUALITY_CONTROL_TESTS",
          "MARSHALL_STABILITY_AND_FLOW_TEST",
          "MOISTURE_SENSITIVITY_TEST",
          "RUTTING_AND_RAVELING_TEST",
          "AGING_AND_DURABILITY_TEST"
        ],
        serviceImageUrl: "assets/img/services-details/asphaltTesting.jpg",
        notableProjects: getProjectsByServiceId(ServicesEnum.ASPHALT_TESTING),
        importantDevices: [
          {
            id: 18,
            name: "marshall_stability_testing_machine",
            imageUrl: "assets/img/Projects/device_3_1.jpg"
          },
          {
            id: 19,
            name: "asphalt_centrifuge_extractor",
            imageUrl: "assets/img/Projects/device_3_2.jpg"
          },
          {
            id: 20,
            name: "automatic_marshall_compactor",
            imageUrl: "assets/img/Projects/device_3_3.jpg"
          },
          {
            id: 21,
            name: "gmm_test",
            imageUrl: "assets/img/Projects/device_3_4.jpg"
          },
        ]
      }
    }
  }

  function getProjectsByServiceId(serviceId) {
    return projects.filter(x => x.serviceId == serviceId)
  }

  const ServicesEnum = {
    GEOTECHNICAL_STUDIES: 1,
    HYDROLOGICAL_STUDIES: 2,
    GEOPHYSICAL_STUDIES: 3,
    GEOLOGICAL_STUDIES: 4,
    MINING_STUDIES: 5,
    SURVEYING_WORKS: 6,
    MATERIAL_QUALITY_TESTING: 7,
    CONCRETE_TESTING: 8,
    ASPHALT_TESTING: 9
  };

  const projects = [
    {
      id: 1,
      serviceId: ServicesEnum.GEOTECHNICAL_STUDIES,
      name: "Project_studying_and_Evaluation_Rocksfall_in_Jazan",
      imageUrl: "assets/img/Projects/project_1_1.jpg"
    },
    {
      id: 2,
      serviceId: ServicesEnum.GEOTECHNICAL_STUDIES,
      name: "Project_constructing_27_dams",
      imageUrl: "assets/img/Projects/project_2_1.jpg"
    },
    {
      id: 3,
      serviceId: ServicesEnum.HYDROLOGICAL_STUDIES,
      name: "Project_asir_bisha",
      imageUrl: "assets/img/Projects/project_3_1.jfif"
    },
    {
      id: 4,
      serviceId: ServicesEnum.HYDROLOGICAL_STUDIES,
      name: "Project_saabar",
      imageUrl: "assets/img/Projects/project_4_1.jfif"
    },
    {
      id: 5,
      serviceId: ServicesEnum.HYDROLOGICAL_STUDIES,
      name: "Project_al_husainiyyah",
      imageUrl: "assets/img/Projects/project_5_1.jfif"
    },
    {
      id: 6,
      serviceId: ServicesEnum.GEOPHYSICAL_STUDIES,
      name: "PROJECT_PUMP_STATION",
      imageUrl: "assets/img/Projects/project_6_1.jfif"
    },
    {
      id: 7,
      serviceId: ServicesEnum.GEOPHYSICAL_STUDIES,
      name: "PROJECT_ELECTRICAL_GEOPHYSICAL_SURVEY",
      imageUrl: "assets/img/Projects/project_7_1.jfif"
    },
    {
      id: 6,
      serviceId: ServicesEnum.GEOLOGICAL_STUDIES,
      name: "PROJECT_DAM_SAFETY",
      imageUrl: "assets/img/Projects/project_8_1.jfif"
    },
    {
      id: 7,
      serviceId: ServicesEnum.GEOLOGICAL_STUDIES,
      name: "PROJECT_MODEL_VILLAGE",
      imageUrl: "assets/img/Projects/project_9_1.jfif"
    },
    {
      id: 8,
      serviceId: ServicesEnum.MINING_STUDIES,
      name: "PROJECT_KOALIN_EXPLORATION",
      imageUrl: "assets/img/Projects/project_2_2.jpg"
    }, {
      id: 9,
      serviceId: ServicesEnum.SURVEYING_WORKS,
      name: "PROJECT_KIND_KHALD",
      imageUrl: "assets/img/Projects/project_10_1.jfif"
    }, {
      id: 18,
      serviceId: ServicesEnum.ASPHALT_TESTING,
      name: "paving_asphalting_lighting_airport_plan_project_abha",
      imageUrl: "assets/img/Projects/project_13_1.jpg"
    },
    {
      id: 19,
      serviceId: ServicesEnum.ASPHALT_TESTING,
      name: "paving_asphalting_lighting_al_hanaki_plan_project",
      imageUrl: "assets/img/Projects/project_13_2.jpg"
    },
    {
      id: 20,
      serviceId: ServicesEnum.ASPHALT_TESTING,
      name: "paving_asphalting_lighting_dana_al_janoub_project",
      imageUrl: "assets/img/Projects/project_13_3.jpg"
    },
    {
      id: 21,
      serviceId: ServicesEnum.ASPHALT_TESTING,
      name: "paving_asphalting_lighting_al_kasi_plan_project",
      imageUrl: "assets/img/Projects/project_13_4.png"
    },
    {
      id: 22,
      serviceId: ServicesEnum.ASPHALT_TESTING,
      name: "paving_asphalting_main_road_project_khamis_abha",
      imageUrl: "assets/img/Projects/project_13_5.jpg"
    },
  ]
  function getKeyByValue(enumObj, value) {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
  }
  window.getServiceByServiceId = getServiceByServiceId
  window.ServicesEnum = ServicesEnum
  window.projects = projects
  window.getKeyByValue = getKeyByValue
  window.loadLanguage = loadLanguage
});
