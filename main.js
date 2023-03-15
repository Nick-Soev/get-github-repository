function getFormData() {
  const searchF = document.getElementById('searchForm');
  searchF.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = searchF.querySelector('#search');
    if (document.querySelector('.war').style.display == 'block') {
      document.querySelector('.war').style.display = 'none';
    };
    if (nameInput.value.length < 2) {
      clear('минимум 2 символа');
    } else if (nameInput.value.trim()) {
      fetchGitUser(nameInput.value.trim());
    } else {
      clear('укажите название репозитория');
    };
    nameInput.value = '';
  })
}
getFormData();

function fetchGitUser(val) {
  const url = `https://api.github.com/search/repositories?q=${val}+in:name&sort=stars&order=desc&per_page=10`;
  fetch(url)
    .then(res => {
      if (res.ok) {
        res.json().then(res => {
          renderRepUser(res.items);
        });
      } else {
        clear('По вашему запросу ничего не нашлось');
      }
    })
}

function renderRepUser(rep) {

  console.log(rep);

  const repWrap = document.querySelector('.cardS__wrap');
  repWrap.innerHTML = '';
  if (rep.length > 0) {
    rep.forEach(({ name, html_url, owner, created_at } = i) => {
      let repItem = document.createElement('div');
      repItem.classList.add('cardS__item')
      repItem.insertAdjacentHTML('beforeend', `
        <div class="card">
          <div class="card__item">
            <div class="card__avatar">
              <img src="${owner.avatar_url}" width="100" height="100" alt="avatar">
            </div>
          </div>
          <div class="card__item">
            <div class="card__repos">
              <span>ссылка на репозиторий :</span><a href="${html_url}" target="_blank">${name}</a>
            </div>
            <div class="card__name">
              <span>логин пользователя :</span><h2>${owner.login}</h2>
            </div>
            <div class="card__date">
              <span>дата публикации :</span><p>${created_at.slice(0, 10)}</p>
            </div>
          </div>
        </div>
      `);
      repWrap.append(repItem);
    })
  } else {
    clear('нет результатов');
  }
}

function clear(text) {
  document.querySelector('.war').textContent = text;
  document.querySelector('.war').style.display = 'block';
  document.querySelector('.cardS__wrap').innerHTML = `
  <div class="war-block">
    <img src="unnamed.jpg" width="100" height="100" alt="avatar">
    <p class="ol-war">Ничего не найдено</p>
  </div>
 `;
}



// let w = "https://api.github.com/users/google/repos";
// let e = 'https://api.github.com/search/repositories?q=count+in:name&sort=stars&order=desc&per_page=10';
// fetch(e)
//   .then(r => r.json())
//   .then(r => {
//     console.log(r.items);
//     console.log(r);
//   })