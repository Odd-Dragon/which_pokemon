document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoints = {
      "backgrounds": "/api/backgrounds",
      //"classes": "/api/classes",
      "conditions": "/api/conditions",
      "equipment": "/api/equipment",
      "feats": "/api/feats",
      "magic-items": "/api/magic-items",
      "monsters": "/api/monsters",
      //"races": "/api/races",
      "spells": "/api/spells",
    };
  
    const fetchButton = document.getElementById('fetchButton');
    const listContainer = document.getElementById('listContainer');
  
    // Get the select element
    const selectElement = document.getElementById('apiEndpoints');
  
    // Populate the select element with options
    for (const endpoint in apiEndpoints) {
      if (apiEndpoints.hasOwnProperty(endpoint)) {
        const option = document.createElement('option');
        option.value = apiEndpoints[endpoint];
        option.textContent = endpoint;
        selectElement.appendChild(option);
      }
    }
  
    // Event listener for the fetch button
    fetchButton.addEventListener('click', function () {
      const selectedEndpoint = selectElement.value;
  
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      // Make the fetch request
      fetch(`https://www.dnd5eapi.co${selectedEndpoint}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // Check if the result contains an array property
          const dataArray = result.hasOwnProperty('results') ? result.results : [result];
  
          // Clear previous list items
          listContainer.innerHTML = '';
  
          // Create list items with names and buttons
          dataArray.forEach(item => {
            const listItem = document.createElement('li');
  
            // Apply CSS class to the list item
            listItem.classList.add('auto-generated-item');
  
            const name = document.createElement('span');
  
            // Apply CSS styles using inline styles
            name.style.fontWeight = 'bold';
            name.style.margin = '5px';
            name.textContent = item.name;
  
            const button = document.createElement('button');
  
            // Apply CSS class to the button
            button.classList.add('fetch-details-button');
  
            button.textContent = `Fetch Details for ${item.name}`;
            button.addEventListener('click', function () {
              // Call the function to fetch details when the button is clicked
              fetchDetails(item.url);
            });
  
            listItem.appendChild(name);
            listItem.appendChild(button);
  
            listContainer.appendChild(listItem);
          });
        })
        .catch(error => console.log('error', error));
    });
  
    // Function to fetch details based on the provided URL
    function fetchDetails(url) {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      // Make the fetch request for additional details
      fetch(`https://www.dnd5eapi.co${url}`, requestOptions)
        .then(response => response.json())
        .then(details => {
            // Access the HTML elements in the details box
            const nameSlot = document.getElementById('name-slot');
            const descSlot = document.getElementById('desc-slot');
            const profSlot = document.getElementById('prof-slot');
            const equipSlot = document.getElementById('equip-slot');
            const featureTitle = document.getElementById('feature-title');
            const featureSlot = document.getElementById('feature-slot');
            const priceSlot = document.getElementById('price-slot');
            const catSlot = document.getElementById('cat-slot');
            const raritySlot = document.getElementById('rarity-slot');
            const typeSlot = document.getElementById('type-slot');
            const hpSlot = document.getElementById('hp-slot');
            const statSlot = document.getElementById('stat-slot');
            const actionSlot = document.getElementById('action-slot');
            const spellSlot = document.getElementById('spell-slot');
            const highLvSlot = document.getElementById('highLv-slot');
      
            // Update the content of the details box
            nameSlot.textContent = details.name;

            // Check if starting_proficiencies is an object
            if (Array.isArray(details.starting_proficiencies)) {
                profSlot.textContent = "Proficiencies: " + details.starting_proficiencies.map(item => item.name).join(', ');
            } else {
                profSlot.textContent = details.starting_proficiencies;
            }

            // Check if starting_equipment is an object
            if (Array.isArray(details.starting_equipment)) {
                equipSlot.textContent = "Equipment: " + details.starting_equipment.map(item => item.equipment.name).join(', ');
            } else {
                equipSlot.textContent = details.starting_equipment;
            }

            if (details.feature && details.feature.name) {
                featureTitle.textContent = details.feature.name;
                featureSlot.textContent = details.feature.desc;
              } else {
                // If it doesn't exist, hide the feature title and slot
                featureTitle.style.display = 'none';
                featureSlot.style.display = 'none';
              }

            // Check if the property exists before accessing its values
            if (details.cost && details.cost.quantity && details.cost.unit) {
              const costQuantity = details.cost.quantity;
              const costUnit = details.cost.unit;
              priceSlot.textContent = `${costQuantity} ${costUnit}`;
            } else {
              priceSlot.style.display = 'none';
            }

            if (details.rarity && details.rarity.name) {
              raritySlot.textContent = details.rarity.name;
            } else {
              raritySlot.style.display = 'none';
            }

            if (details.equipment_category && details.equipment_category.name) {
              catSlot.textContent = details.equipment_category.name;
            } else {
              catSlot.style.display = 'none';
            }
            
            if ( details.size && details.alignment && details.type) {
              const sizeData = details.size;
              const alignmentData = details.alignment;
              const monsterType = details.type;
              typeSlot.textContent = `${sizeData} ${alignmentData} ${monsterType}`;
            } else {
              typeSlot.style.display = 'none';
            }

            if (details.hit_points && details.hit_points_roll) {
              const hp = details.hit_points;
              const hp_roll = details.hit_points_roll;
              hpSlot.textContent = `Hit Points: ${hp} (${hp_roll})`;
            } else {
              hpSlot.style.display = 'none';
            }

            if (details.strength && details.dexterity && details.constitution 
              && details.intelligence && details.wisdom && details.charisma) {
              const str = details.strength;
              const dex = details.dexterity;
              const con = details.constitution;
              const int = details.intelligence;
              const wis = details.wisdom;
              const cha = details.charisma;
              statSlot.textContent = `STR: ${str} DEX: ${dex}
              CON: ${con} INT: ${int} WIS: ${wis} CHA: ${cha}`;
            } else {
              statSlot.style.display = 'none';
            }

            if (details.actions) {
              if (Array.isArray(details.actions)) {
                // If it's an array, create an unordered list and append list items
                const ul = document.createElement('ul');
            
                details.actions.forEach(action => {
                  const li = document.createElement('li');
                  li.innerHTML = `<strong>${action.name}</strong>: ${action.desc}`;
            
                  // Check if there are nested actions for this action
                  if (action.actions && Array.isArray(action.actions)) {
                    const nestedUl = document.createElement('ul');
                    action.actions.forEach(nestedAction => {
                      const nestedLi = document.createElement('li');
                      nestedLi.innerHTML = `<strong>${nestedAction.name}</strong>: ${nestedAction.desc}`;
                      nestedUl.appendChild(nestedLi);
                    });
                    li.appendChild(nestedUl);
                  }
            
                  ul.appendChild(li);
                });
            
                // Replace the existing content with the list
                actionSlot.innerHTML = '';
                actionSlot.appendChild(ul);
              } else {
                // If it's not an array, directly set the text content
                actionSlot.textContent = details.actions;
              }
            } else {
              actionSlot.style.display = 'none';
            }

            if (details.casting_time && details.range 
              && details.duration && details.school && details.school.name) {
              const ct = details.casting_time;
              const range = details.range;
              const dur = details.duration;
              const school = details.school.name;
              spellSlot.textContent = `Casting Time: ${ct}
              Range: ${range} Duration: ${dur} School: ${school}`;
            } else {
              spellSlot.style.display = 'none';
            }

            if (details.higher_level) {
              const highLv = details.higher_level;
              highLvSlot.textContent = `At Higher Levels: ${highLv}`;
            } else {
              highLvSlot.style.display = 'none';
            }

            // Check if the property is an array
            if (Array.isArray(details.desc)) {
                // If it's an array, create an unordered list and append list items
                const ul = document.createElement('ul');
                details.desc.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
                });

                // Replace the existing content with the list
                descSlot.innerHTML = '';
                descSlot.appendChild(ul);
            } else {
                // If it's not an array, directly set the text content
                descSlot.textContent = details.desc;
            }

            // Log the details to the console for debugging
            console.log('Details:', details);
          })
        .catch(error => console.log('Error fetching details:', error));
    }
  });