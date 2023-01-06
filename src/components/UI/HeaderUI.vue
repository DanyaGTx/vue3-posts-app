<template>
    <div class="header__wrapper">
    <div class="container">
      <div class="header">
        <ul class="header__nav-links">
          <li class="header__link-item">
            <router-link class="header__link" :to="{ name: 'posts' }"
              >Posts</router-link
            >
          </li>
          <li class="header__link-item">
            <router-link class="header__link" :to="{ name: 'albums' }"
              >Albums</router-link
            >
          </li>
          <li class="header__link-item">
            <router-link class="header__link" :to="{ name: 'todos' }"
              >Users</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
