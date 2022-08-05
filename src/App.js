import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import SkeletonCategory from './Skeleton/SkeletonCategory';
import SkeletonItem from './Skeleton/SkeletonItem';

import './App.scss';

function App() {
  // Основное хранилище данных для табов
  const [items, setItems] = React.useState([]);
  const [tabNames, setTabNames] = React.useState([]);

  // Стейты для работы фильтров
  const [tabsContent, setTabsContent] = React.useState([]);

  // Стейты для хранения и изменения состояний
  const [activeButton, setActiveButton] = React.useState(0);
  const [isLoadingCategory, setIsLoadingCategory] = React.useState(true);
  const [isLoadingItems, setIsLoadingItems] = React.useState(true);

  // Получаем категории табов
  React.useEffect(() => {
    fetch('https://my-json-server.typicode.com/glebov-g/frontend-fake-db/categories')
    .then(res => res.json())
    .then(arr => {
      // Заполняем стейт данными из полученных данных
      setTabNames(arr)
      // Убираем скелетон с части навигации
      setIsLoadingCategory(false)
    })
  }, [])

  // Получаем контент для табов
  React.useEffect(() => {
    fetch('https://my-json-server.typicode.com/glebov-g/frontend-fake-db/items')
    .then(res => res.json())
    .then(arr => {
      // Заполняем основное хранилище полученными данными
      setItems(arr)
      // Ставим активным 1 таб
      setActiveButton(0);
      // Фильтруем информацию для первого таба
      setTabsContent(filterPost(arr, 1));
      // Убираем скелетон с части табов
      setIsLoadingItems(false)
    })
  }, [])

  // Фильтр категорий
  const filterPost = (items, id) => {
    if (id) {
      return items.filter((item) => (item.categoryId === id ));
    } else {
      return items;
    }
 };
  // Что будет если нажать на кнопку
  const onFiltered = (i, id) => {
    setIsLoadingItems(true);
    // Ставим активным таб i
    setActiveButton(i);
    // Фильтруем в зависимости от id
    setTabsContent(filterPost(items, id));
    // Убираем скелетон со страницы
    setIsLoadingItems(false);
  };
  // Настройки для слайдера
  const sliderSettings = {
    perPage: 4,
    perMove: 1,
    gap : '16px',
    rewind : true,
    pagination: false,
    breakpoints: {
      1330: {
        perPage: 3,
        
        gap : '16px',
      },
      999: {
        perPage: 2,
        gap : '16px',
        arrows: false,
        pagination: true
      },
      700: {
        perPage: 1,
        gap : '16px',
      }
    }
    }

  return (
    <div className="App">
      <header className="App-header header__container">
        <h1 className="header__title">Блог и соцсети</h1>
        <p className="header__subtitle">Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки направлений прогрессивного развития.</p>
      </header>
      <main className="main__container">
        <div className="tabs__inner">
          <div className="tabs__names">
            {/* Если категории не загрузились, показываем скелетон */}
            {isLoadingCategory ? <SkeletonCategory /> : tabNames.map((name, i) => <button key={name.id} onClick={() => onFiltered(i, name.id)} className={
                    activeButton === i
                      ? "tab__name active"
                      : "tab__name"
                  }>{name.name}</button>)}
          </div>
          <div className="tabs__content">
          <Splide options={sliderSettings}>
            {/* Если айтемы не загрузились, показываем скелетон */}
            {isLoadingItems ? [...new Array(4)].map((_, index) => (
              <SplideSlide key={index} >
                  <SkeletonItem />
                  </SplideSlide>
                ))   : tabsContent.map(tab => 
              (<>
                <SplideSlide key={tab.id}>
                  <a href={tab.url}>
                  <div className="tab__content">
                    <img className="tab__content-image" src={tab.image} alt={tab.name} />
                    <div className="tab__content-inner">
                      <p className="tab__content-description" >{tab.description}</p>
                      <div className="tab__content-tag">
                        {tab.tags.map((tag, i) => <a key={tag.id} href={tag.name}>{tag.name}</a>)}
                      </div>
                    </div>
                  </div>
                  </a>
                </SplideSlide>
              </>)
            )}
          </Splide>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
