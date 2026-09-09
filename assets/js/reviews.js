/**
 * Lakshay Computer Care - Customer Reviews Engine
 * 25 Marquee Animated Reviews (Left-to-Right & Vice-Versa)
 * + Expandable "See All Reviews" directory (75+ additional reviews with live search)
 */

(function () {
  'use strict';

  const ALL_REVIEWS = [
    // 25 Marquee Reviews
    { name: "Aman Verma", text: "Laptop ka charging issue tha. Same day problem diagnose karke repair kar diya. Service kaafi smooth rahi." },
    { name: "Mohammad Arif", text: "I purchased a refurbished Dell laptop from Lakshay Computer Care. The condition was clean and performance has been good so far." },
    { name: "Gurpreet Singh", text: "Mera laptop kaafi heat ho raha tha aur hang karta tha. Proper cleaning aur servicing ke baad ab smoothly chal raha hai." },
    { name: "Neha Sharma", text: "Very helpful service. They explained the issue properly instead of simply asking me to replace unnecessary parts." },
    { name: "Faizan Khan", text: "Laptop ka keyboard replace karwaya tha. Fitting clean thi aur kaam bhi time par ho gaya." },
    { name: "Harleen Kaur", text: "Got my laptop upgraded with an SSD. The speed difference is huge. Good experience overall." },
    { name: "Rohit Gupta", text: "Purana desktop boot nahi ho raha tha. Problem repair ho gayi aur important data bhi safe raha." },
    { name: "Sahil Ahmed", text: "Bought a refurbished HP laptop for office work. Good specifications for the price." },
    { name: "Simran Kaur", text: "Service professional thi aur repair se pehle cost clearly bata di gayi thi." },
    { name: "Aditya Mishra", text: "Windows installation aur driver setup karwaya. Everything was done properly." },
    { name: "Zoya Siddiqui", text: "My laptop suddenly stopped turning on. They diagnosed the motherboard issue and explained the repair clearly." },
    { name: "Manpreet Singh", text: "Budget ke andar achha refurbished laptop suggest kiya. Daily office work ke liye perfect hai." },
    { name: "Kajal Yadav", text: "Laptop fan bahut noise kar raha tha. Cleaning ke baad problem solve ho gayi." },
    { name: "Rehan Ali", text: "Good place for laptop repair. Staff was polite and the turnaround time was reasonable." },
    { name: "Jasleen Kaur", text: "Maine RAM upgrade karwayi thi. Laptop ki performance noticeably better ho gayi." },
    { name: "Vivek Tiwari", text: "Desktop computer ka power supply issue tha. Repair jaldi ho gaya." },
    { name: "Sameer Qureshi", text: "Purchased a used Lenovo ThinkPad. Battery and performance were explained honestly before purchase." },
    { name: "Navjot Singh", text: "Very satisfactory service. Laptop screen replacement was done neatly." },
    { name: "Priya Saxena", text: "Laptop slow chal raha tha. SSD lagwane ke baad bilkul different machine lag raha hai." },
    { name: "Ayaan Malik", text: "Good service and reasonable pricing. They also helped me understand what was wrong with my laptop." },
    { name: "Anjali Srivastava", text: "Mera laptop start hone mein 10 minute leta tha. Upgrade ke baad ab seconds mein boot ho jata hai." },
    { name: "Irfan Ansari", text: "Refurbished laptop liya tha online classes ke liye. Price ke according kaafi good deal mili." },
    { name: "Harmanpreet Kaur", text: "The laptop servicing was done properly and overheating has reduced significantly." },
    { name: "Abhishek Pandey", text: "Computer repair ke liye reliable experience raha. Issue properly identify kiya." },
    { name: "Nazia Parveen", text: "My laptop display was flickering. They fixed the issue and it has been working properly since." },
    
    // Remaining Reviews (Added to "See All Reviews" section)
    { name: "Karan Arora", text: "Dell laptop ka hinge repair karwaya. Kaam neat tha." },
    { name: "Imran Sheikh", text: "Good experience purchasing a refurbished computer for my shop. Setup was also completed for me." },
    { name: "Mehak Kaur", text: "Laptop ki battery aur performance dono check karke clearly explain kiye before purchase." },
    { name: "Saurabh Tripathi", text: "Old PC ko SSD aur RAM upgrade karwa ke kaafi usable bana diya." },
    { name: "Ayesha Khan", text: "Professional service. My laptop was repaired without any unnecessary delays." },
    { name: "Deepak Chauhan", text: "Laptop mein Windows crash ho raha tha. Fresh installation ke baad sab smoothly chal raha hai." },
    { name: "Bilal Ahmad", text: "Bought a refurbished laptop for freelance work. Good configuration within my budget." },
    { name: "Rupinder Kaur", text: "Service kaafi transparent lagi. Repair karne se pehle problem aur charges dono explain kiye." },
    { name: "Pooja Agarwal", text: "Laptop screen replace karwayi thi. Display quality achhi hai aur fitting proper hai." },
    { name: "Danish Mirza", text: "Quick diagnosis and helpful service. My laptop charging problem was resolved." },
    { name: "Gagandeep Singh", text: "Computer ka motherboard issue repair karwaya. Ab system stable chal raha hai." },
    { name: "Ritika Jain", text: "Refurbished laptop options achhe the aur specifications clearly batayi gayi." },
    { name: "Mohit Bansal", text: "Old laptop ki servicing aur SSD upgrade karwayi. Performance kaafi improve hui." },
    { name: "Shadab Hussain", text: "Good customer service and reasonable repair charges." },
    { name: "Amritpal Singh", text: "Laptop heating issue resolve ho gaya. Thermal servicing properly ki gayi." },
    { name: "Sneha Kapoor", text: "My laptop had become extremely slow. They suggested an SSD upgrade instead of pushing me to buy a new laptop." },
    { name: "Nadeem Akhtar", text: "Desktop repair ka experience achha raha. Problem jaldi identify ho gayi." },
    { name: "Prabhjot Kaur", text: "Bought a refurbished Dell laptop. Clean condition and good performance." },
    { name: "Arjun Thakur", text: "Keyboard aur touchpad issue repair karwaya. Dono properly work kar rahe hain." },
    { name: "Sana Rizvi", text: "Staff explained everything patiently. My laptop was repaired within the expected time." },
    { name: "Ravi Shukla", text: "Laptop ka charger port loose tha. Repair ke baad ab bilkul proper hai." },
    { name: "Farhan Alam", text: "Affordable and dependable laptop repair service." },
    { name: "Kirandeep Kaur", text: "Laptop servicing ke baad fan noise aur heating dono kaafi kam ho gaye." },
    { name: "Nitin Mathur", text: "Refurbished laptop office work ke liye liya tha. Good value for money." },
    { name: "Hina Fatima", text: "The laptop was checked properly before being handed back. Good experience." },
    { name: "Akash Tyagi", text: "Computer upgrade karwaya tha. RAM aur SSD ke baad performance kaafi fast ho gayi." },
    { name: "Salman Raza", text: "Laptop boot nahi ho raha tha. Repair ho gaya aur data bhi delete nahi hua." },
    { name: "Rajveer Singh", text: "Bought a second-hand laptop for college work. Good condition and fair pricing." },
    { name: "Isha Khanna", text: "Laptop ke speaker issue ko properly fix kiya. Service satisfactory thi." },
    { name: "Adnan Siddiqui", text: "Good technical knowledge. They identified the actual issue instead of guessing." },
    { name: "Taranpreet Kaur", text: "Mera laptop bahut slow tha. SSD upgrade ke baad speed kaafi better ho gayi." },
    { name: "Shivam Dubey", text: "Desktop servicing aur Windows installation dono karwaye. Good work." },
    { name: "Mahira Khan", text: "I liked that the repair cost was discussed before the work started." },
    { name: "Amandeep Singh", text: "Laptop screen replacement cleanly kiya gaya. No issues after repair." },
    { name: "Nidhi Rastogi", text: "Refurbished laptop lene se pehle specifications aur condition properly explain ki." },
    { name: "Yusuf Khan", text: "Laptop ka Wi-Fi issue solve ho gaya. Quick and useful service." },
    { name: "Paramjeet Kaur", text: "Very good experience with laptop cleaning and servicing." },
    { name: "Ankit Joshi", text: "Purane computer mein SSD install karwayi. Ab system kaafi fast hai." },
    { name: "Rizwan Ali", text: "Purchased an HP refurbished laptop. Works well for office and browsing." },
    { name: "Komal Arora", text: "Laptop ke hinge aur body repair ka kaam neat tha." },
    { name: "Fahad Ansari", text: "Reasonable charges and good communication throughout the repair." },
    { name: "Sukhman Singh", text: "Gaming laptop overheating issue tha. Servicing ke baad temperatures noticeably better hain." },
    { name: "Payal Mishra", text: "Laptop ka keyboard kaam nahi kar raha tha. Replacement properly ho gaya." },
    { name: "Hamza Qureshi", text: "They helped me select a refurbished laptop according to my work requirements instead of just selling the expensive option." },
    { name: "Mandeep Kaur", text: "Service timely thi aur laptop ki condition bhi properly check karke di." },
    { name: "Yash Agarwal", text: "Desktop power issue repair karwaya. System ab properly start ho raha hai." },
    { name: "Alisha Noor", text: "My laptop display issue was fixed properly. Good overall experience." },
    { name: "Jatinder Singh", text: "Refurbished ThinkPad liya. Build quality aur performance dono achhe hain." },
    { name: "Riya Tandon", text: "Laptop servicing aur software cleanup ke baad system noticeably faster hai." },
    { name: "Saif Ali", text: "Good place if you need laptop repair without unnecessary upselling." },
    { name: "Gurleen Kaur", text: "Laptop ki battery replace karwayi. Backup ab kaafi better mil raha hai." },
    { name: "Harsh Vardhan", text: "PC mein RAM upgrade aur Windows setup karwaya. Work done properly." },
    { name: "Afreen Khan", text: "Helpful and professional service. They answered all my questions before the repair." },
    { name: "Balpreet Singh", text: "Laptop ka broken hinge repair karwaya. Fitting kaafi clean hai." },
    { name: "Shweta Tripathi", text: "Student budget mein refurbished laptop suggest kiya. Performance daily work ke liye achhi hai." },
    { name: "Armaan Sheikh", text: "Computer servicing and SSD upgrade were worth it. System feels much faster now." },
    { name: "Navneet Kaur", text: "Repair ka status clearly bataya aur time par laptop ready mil gaya." },
    { name: "Gaurav Bhatia", text: "Laptop charging jack issue solve karwaya. Good work." },
    { name: "Noman Khan", text: "Purchased a refurbished desktop setup for office use. Everything was tested before delivery." },
    { name: "Dilpreet Kaur", text: "Laptop ki cleaning aur thermal paste service ke baad heating kam ho gayi." },
    { name: "Sakshi Chaturvedi", text: "The staff was knowledgeable and explained the repair in simple language." },
    { name: "Aqib Hussain", text: "Laptop start nahi ho raha tha. Problem solve kar di without disturbing my files." },
    { name: "Harjit Singh", text: "Good refurbished laptop collection for different budgets." },
    { name: "Tanvi Malhotra", text: "Screen replacement aur servicing dono ek hi place par ho gayi. Convenient experience." },
    { name: "Arsalan Ahmad", text: "Fair pricing and decent turnaround time. Laptop is working properly after repair." },
    { name: "Ramanpreet Kaur", text: "Laptop slow tha aur storage full rehta tha. SSD upgrade ka suggestion useful raha." },
    { name: "Mayank Srivastava", text: "Computer assembling aur setup ka experience achha tha. Requirements ke according parts suggest kiye." },
    { name: "Shabnam Ali", text: "Refurbished laptop ki condition expected se better thi. Good purchase." },
    { name: "Inderjeet Singh", text: "Laptop ka fan replace karwaya. Noise issue completely solve ho gaya." },
    { name: "Muskan Gupta", text: "My old laptop feels much better after servicing and an SSD upgrade." },
    { name: "Tariq Mahmood", text: "Good service for laptop repairs and upgrades. Everything was explained clearly." },
    { name: "Jaspreet Kaur", text: "College work ke liye refurbished laptop liya. Budget mein achha option mila." },
    { name: "Rahul Saini", text: "Laptop motherboard repair hua aur ab properly work kar raha hai." },
    { name: "Meher Fatima", text: "Professional behaviour, clear communication and satisfactory laptop repair." },
    { name: "Kunal Mehra", text: "Overall good experience with Lakshay Computer Care. Repair, upgrade aur refurbished laptop options ek hi place par mil jate hain." }
  ];

  function createCardHTML(rev, isCompact = false) {
    const initials = rev.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2);

    return `
      <div class="review-card ${isCompact ? 'w-[280px] sm:w-[340px]' : 'w-full'} shrink-0 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group shadow-sm">
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 font-headline font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                ${initials}
              </div>
              <div>
                <h4 class="font-headline font-bold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">${rev.name}</h4>
                <div class="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                  <span class="material-symbols-outlined text-[12px]">verified</span>
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
            <div class="flex text-amber-400">
              <span class="material-symbols-outlined text-xs sm:text-sm">star</span>
              <span class="material-symbols-outlined text-xs sm:text-sm">star</span>
              <span class="material-symbols-outlined text-xs sm:text-sm">star</span>
              <span class="material-symbols-outlined text-xs sm:text-sm">star</span>
              <span class="material-symbols-outlined text-xs sm:text-sm">star</span>
            </div>
          </div>
          <p class="text-[11px] sm:text-xs text-slate-300 font-mono leading-relaxed mt-1">
            "${rev.text}"
          </p>
        </div>
      </div>
    `;
  }

  function initReviews() {
    // 1. Render Marquee Row 1 (first 13 reviews)
    const marqueeTrack1 = document.getElementById('reviews-marquee-track-1');
    if (marqueeTrack1) {
      const row1Data = ALL_REVIEWS.slice(0, 13);
      const cards1 = row1Data.map(r => createCardHTML(r, true)).join('');
      // Duplicate to create infinite seamless loop
      marqueeTrack1.innerHTML = cards1 + cards1;
    }

    // 2. Render Marquee Row 2 (next 12 reviews, vice-versa)
    const marqueeTrack2 = document.getElementById('reviews-marquee-track-2');
    if (marqueeTrack2) {
      const row2Data = ALL_REVIEWS.slice(13, 25);
      const cards2 = row2Data.map(r => createCardHTML(r, true)).join('');
      // Duplicate to create infinite seamless loop
      marqueeTrack2.innerHTML = cards2 + cards2;
    }

    // 3. Render "See All Reviews" (from 26 to 100 - all 75 remaining reviews)
    const remainingReviews = ALL_REVIEWS.slice(25);
    const gridContainer = document.getElementById('all-reviews-grid');
    const searchInput = document.getElementById('reviews-search-input');
    const countBadge = document.getElementById('reviews-count-badge');
    const toggleBtn = document.getElementById('toggle-all-reviews-btn');
    const toggleIcon = document.getElementById('toggle-reviews-icon');
    const toggleText = document.getElementById('toggle-reviews-text');
    const expandableSection = document.getElementById('expandable-reviews-section');

    let isExpanded = false;
    let currentFilter = '';

    function renderGrid(reviewsToDisplay) {
      if (!gridContainer) return;
      if (reviewsToDisplay.length === 0) {
        gridContainer.innerHTML = `
          <div class="col-span-full py-12 text-center text-slate-400 font-mono text-xs">
            <span class="material-symbols-outlined text-3xl text-slate-500 mb-2 block">search_off</span>
            No reviews found matching "${currentFilter}". Try another term like "SSD", "Dell", or "screen".
          </div>
        `;
      } else {
        gridContainer.innerHTML = reviewsToDisplay.map(r => createCardHTML(r, false)).join('');
      }

      if (countBadge) {
        countBadge.textContent = `${reviewsToDisplay.length} Reviews`;
      }
    }

    // Initial render of remaining reviews in grid
    renderGrid(remainingReviews);

    // Toggle button handler
    if (toggleBtn && expandableSection) {
      toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        if (isExpanded) {
          expandableSection.classList.remove('hidden');
          expandableSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (toggleText) toggleText.textContent = 'Hide All Reviews';
          if (toggleIcon) toggleIcon.textContent = 'expand_less';
        } else {
          expandableSection.classList.add('hidden');
          if (toggleText) toggleText.textContent = 'See All Reviews';
          if (toggleIcon) toggleIcon.textContent = 'expand_more';
        }
      });
    }

    // Search input handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentFilter = e.target.value.trim().toLowerCase();
        // Search across all remaining reviews or all 100 if query is typed
        const baseList = currentFilter.length > 0 ? ALL_REVIEWS : remainingReviews;
        const filtered = baseList.filter(r => 
          r.name.toLowerCase().includes(currentFilter) || 
          r.text.toLowerCase().includes(currentFilter)
        );
        renderGrid(filtered);

        // If user starts searching, automatically reveal the section if hidden
        if (currentFilter.length > 0 && isExpanded === false && expandableSection) {
          isExpanded = true;
          expandableSection.classList.remove('hidden');
          if (toggleText) toggleText.textContent = 'Hide All Reviews';
          if (toggleIcon) toggleIcon.textContent = 'expand_less';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviews);
  } else {
    initReviews();
  }
})();
