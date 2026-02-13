document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.menu-grid');

  fetch('https://cmc-website.onrender.com/staff')
    .then(res => res.json())
    .then(staff => {
      container.innerHTML = '';

    const rankPriority = {
        owner: 1,
        manager: 2,
        developer:3,
        admin: 4,
        mod: 5,
        helper: 6
    };

    staff.sort((a, b) => {
        const rankA = rankPriority[(a.rank || '').toLowerCase()] ?? 999;
        const rankB = rankPriority[(b.rank || '').toLowerCase()] ?? 999;
        return rankA - rankB;
    });

      staff.forEach(member => {
        // create the staff div
        const div = document.createElement('div');
        div.classList.add('menu-item');

        // mc head
        const img = document.createElement('img');
        img.src = `https://mc-heads.net/avatar/${member.ign}/100`;
        img.alt = member.ign;

        // info container for IGN + rank
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('staff-info');

        // ign
        const ign = document.createElement('div');
        ign.classList.add('ign');
        ign.textContent = member.ign;

        // rank
        const rank = document.createElement('div');
        rank.classList.add('rank');
        rank.textContent = member.rank;
        rank.classList.add(member.rank.toLowerCase());

        infoDiv.appendChild(ign);
        infoDiv.appendChild(rank);

        // append image + info to the main div
        div.appendChild(img);
        div.appendChild(infoDiv);

        // add the staff div to menu grid
        container.appendChild(div);

        // i hate javascript
      });
    })
    .catch(err => console.error('Error fetching staff:', err));
});

