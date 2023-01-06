<template>
    <div class="loaded-photos">
        <swiper
            :slidesPerView="5"
            :spaceBetween="10"
            :modules="modules"
            class="mySwiper"
            :navigation="true" 
        >
            <swiper-slide class="slides" v-for="photo in loadedPhotosForAlbum.splice(0,10)" :key="photo.id"><img width="100" :src="photo.url" alt="photo"></swiper-slide>
        </swiper>
    </div>
        
        <button @click="getPhotosByAlbumId(props.albumId)" class="photo__item-button">Show photo</button>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../../api/api'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps( {
    albumId: {
        type: Number,
        required: true
    }
} )
const modules = [Navigation,Pagination]

const loadedPhotosForAlbum = ref( [] )

const getPhotosByAlbumId = async ( albumId ) => {
    const { data } = await api.photos.getPhotosByAlbumId( { 'albumId': albumId } )
    loadedPhotosForAlbum.value = data
}

</script>

