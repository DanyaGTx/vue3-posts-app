<template>
    <div class="photo__items">
        <div class="photo__item" v-for="album in allAlbums" :key="album.id">
            <h2 class="photo__item-title">Album# {{album.id}}</h2>
            <p class="photo__item-description">Description: {{album.title}}</p>
            <AlbumsPhotos :albumId="album.id" />
        </div>
    </div>
    <CustomPagination :customization="paginationCustomization" @update-pagination="changePage" :totalCount="getTotalCount" :perPage="perPage" :currentPage="currentPage"/>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { api } from '../api/api.js'
import CustomPagination from '../components/elements/CustomPagination.vue'
import AlbumsPhotos from '../components/elements/AlbumsPhotos.vue'
const getTotalCount = ref()

const allAlbums = ref( [] )

const perPage = ref( 5 )
const currentPage = ref( 1 )

const paginationCustomization = {
    pagesOnSides: 3,
    showArrows: true
}

const getAlbums = async () => {
    const { data } = await api.albums.getAlbums( { '_page':  currentPage.value , '_limit': perPage.value } )
    allAlbums.value = data
}

const getAlbumsLength = async () => {
    const { data } = await api.albums.getAllAlbums()
    getTotalCount.value = data.length
}

const changePage = ( page ) => {
    currentPage.value = page
}

watch( () => currentPage.value, () => getAlbums() )

onMounted( () => {
    getAlbums()
    getAlbumsLength()
} )
</script>
