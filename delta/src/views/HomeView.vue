<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ModuleForm from '@/components/modules/ModuleForm.vue'

const mock = {
  steps: [
    {
      text: 'Основная информация',
      url: '/'
    },
    {
      text: 'Квалификационные документы',
      url: '/'
    },
    {
      text: 'Опыт работы',
      url: '/'
    },
    {
      text: 'Образование',
      url: '/'
    },
    {
      text: 'Контакты',
      url: '/'
    },
    {
      text: 'Данные для расчётов',
      url: '/'
    },
    {
      text: 'Виды работ',
      url: '/'
    },
    {
      text: 'Дополнительные данные',
      url: '/'
    }
  ]
}
</script>

<template>
  <aside class="page-aside">
    <in-svg src="/icons/logo.svg" />
    <p>Профиль</p>
    <div class="routes-block">
      <router-link class="active" to="/">Обо мне</router-link>
      <router-link to="/">Документы</router-link>
    </div>
    <p>Моя работа</p>
    <div class="routes-block">
      <router-link to="/">Объекты</router-link>
      <router-link to="/">Календарь работ</router-link>
      <router-link to="/">Отклики</router-link>
    </div>
  </aside>
  <header class="page-header">
    <nav>
      <div class="left">
        <router-link to="/">
          <in-svg src="/icons/vacancies.svg" />
          Вакансии
        </router-link>
        <router-link to="/">
          <in-svg src="/icons/objects.svg" />
          Объекты
        </router-link>
      </div>
      <div class="right">
        <router-link to="/">
          <in-svg src="/icons/favorites.svg" />
          Избранное
        </router-link>
        <router-link to="/">
          <in-svg src="/icons/notifications.svg" />
          Уведомления
        </router-link>
        <router-link to="/">
          <Avatar class="avatar">
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback class="avatar--fallback">АБ</AvatarFallback>
          </Avatar>
          Профиль
        </router-link>
      </div>
    </nav>
  </header>
  <main>
    <header>
      <button class="back">
        <in-svg src="/icons/arrow.svg" />
        <span>Назад</span>
      </button>
      <h1>Заполнить профиль</h1>
    </header>
    <ModuleForm />
    <aside>
      <ul>
        <li v-for="({ text, url }, idx) in mock.steps" :key="text + idx">
          <router-link :class="{ active: idx === 0 }" :to="url">{{ text }}</router-link>
        </li>
      </ul>
      <p>
        <span class="icon" />
        Заполните раздел <b>Документы</b>, это позволит вам отправить их работодателю одним кликом.
      </p>
    </aside>
  </main>
</template>

<style lang="scss">
@mixin white-die {
  background-color: var(--white);
  border-radius: 8px;
  padding: 24px;
}

#app {
  display: grid;
  grid-template-areas:
    'paside pheader'
    'paside pmain';
  justify-content: flex-start;
  grid-template-columns: 240px 1fr;
}

.page-aside {
  grid-area: paside;
  width: 240px;
  min-height: 100vh;
  float: left;
  background-color: rgba(#000, 0.87);
  padding: 27px 8px;
  svg {
    width: 140px;
    height: 34px;
    margin-left: 16px;
    margin-bottom: 48px;
  }
  p {
    font-size: 12px;
    color: var(--gray-3);
    padding: 13px 16px;
  }

  .routes-block {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-bottom: 16px;
    a {
      display: block;
      color: var(--white);
      opacity: 0.6;
      font-weight: 600;
      padding: 8px 16px;
      &.active {
        opacity: 1;
        background-color: var(--gray-3);
        border-radius: 4px;
      }
    }
  }
}

.page-header {
  grid-area: pheader;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid var(--gray-1);

  nav {
    &,
    & > div {
      display: flex;
      align-items: center;
    }
    max-width: 1200px;
    height: 100%;
    justify-content: space-between;
    padding: 0 24px;

    a {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    .left {
      column-gap: 48px;
      a {
        font-size: 20px;
        font-weight: 500;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .right {
      column-gap: 24px;
      a {
        font-size: 14px;
        font-weight: 600;
        color: var(--gray-3);
        padding: 0 8px;
        &:last-of-type {
          padding: 0;
        }
        svg {
          width: 28px;
          height: 28px;
        }
        .avatar {
          width: 48px;
          height: 48px;
          font-size: 20px;
          background-color: var(--white);
          margin: 0;
        }
      }
    }
  }
}

main {
  grid-area: pmain;
  display: grid;
  grid-template-areas:
    'head head'
    'form aside';
  grid-template-columns: 748px 380px;
  justify-content: flex-start;
  column-gap: 24px;
  padding: 24px;
  & > header {
    grid-area: head;
    display: flex;
    align-items: center;
    column-gap: 16px;
    margin-bottom: 20px;
    button.back {
      display: flex;
      align-items: center;
      column-gap: 4px;
      background-color: var(--white);
      border: 1px solid var(--gray-1);
      border-radius: 4px;
      padding: 10px 16px 10px 8px;
      svg {
        width: 24px;
        height: 24px;
        rotate: 90deg;
      }
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
    }
  }
  & > form {
    grid-area: form;
    @include white-die;
  }
  & > aside {
    grid-area: aside;
    width: 380px;
    color: var(--gray-2);
    ul {
      @include white-die;
      height: max-content;
      display: flex;
      flex-direction: column;
      row-gap: 4px;
      margin-bottom: 24px;
      li {
        a {
          display: block;
          padding: 8px 16px;
          &.active {
            color: var(--white);
            background-color: var(--gray-3);
            border-radius: 4px;
            padding: 11px 16px;
          }
        }
      }
    }

    p {
      @include white-die;
      text-align: center;
      line-height: 24px;

      span {
        position: relative;
        display: block;
        width: 32px;
        height: 32px;
        background-color: #ffdb1e;
        border-radius: 50%;
        margin: 0 auto 20px;
        &::after {
          content: url('/icons/docs.svg');
          display: block;
          width: 16px;
          height: 16px;
          position: absolute;
          left: 8px;
          top: 8px;
        }
      }
    }
  }
}
</style>
