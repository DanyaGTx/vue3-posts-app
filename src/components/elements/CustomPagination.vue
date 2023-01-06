<template>
    <div class="pagination__wrapper">
        <div v-if="pagesCount > 1" style="display: flex; gap: 2; justify-content: center; align-items: center; margin-top: 50px;">
            <div v-if="props.customization.showArrows">
                <button v-show="currentPage > 1" @click="goToPreviousPage" class="pagination__buttons pagination__buttonLeft">←</button>
            </div> 
            <p style="font-size: 20px; cursor: pointer; user-select: none; padding: 10px 18px 10px 18px;" v-for="page in paginationView" :class="page === props.currentPage && 'pagination__page--active' || Number.isInteger(page) && 'pagination__page--notActive' || page === '...' && 'font-bold text-[30px]'" @click="goToPage(page)" :key="page">{{page}}</p>
            <div v-if="props.customization.showArrows">
                <button v-show="currentPage < pagesCount" @click="toNextPage" class="pagination__buttons pagination__buttonRight">→</button>
            </div> 
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps( {
    totalCount: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    customization: {
        type: Object,
        default: () => {
            const customization = {
                pagesOnSides: 3,
                showArrows: true
            }
            return customization
        }
    }

} )

const pagesCount = computed( () => {
    return Math.ceil( props.totalCount / props.perPage )
} )

const emit = defineEmits( { 'update-pagination': null } )

const goToPage = ( page ) => {
    if ( page !== '...' ) {
        emit( 'update-pagination', page )
    }
}

const goToPreviousPage = () => {
    if ( props.currentPage !== 1 ) {
        emit( 'update-pagination', props.currentPage - 1 )
    }
}
const toNextPage = () => {
    if ( props.currentPage !== pagesCount.value ) {
        emit( 'update-pagination', props.currentPage + 1 )
    }
}

const paginationNumbers = computed( () => {
    const pagesArr = []
    for ( let i = 1; i <= pagesCount.value; i++ ) {
        pagesArr.push( i )
    }
    return pagesArr
} )

const paginationView = computed( () => {
    if ( pagesCount.value > 9 ) {
        const firstThreePages = paginationNumbers.value.slice( 0, props.customization.pagesOnSides )
        const lastThreePages = paginationNumbers.value.slice( paginationNumbers.value.length - props.customization.pagesOnSides )  
        const pagesArr = []
        const beforePages = props.currentPage - 1
        const afterPages = props.currentPage + 1

        pagesArr.push( ...firstThreePages )

        if( props.customization.pagesOnSides >= 1 && props.customization.pagesOnSides <= ( props.customization.pagesOnSides + 2 ) ) {
            if ( props.currentPage >= 1 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                if( props.customization.pagesOnSides === 1 ) {
                    pagesArr.push( 2 )
                    if ( props.currentPage >= 2 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                        pagesArr.push( 3 )
                    }
                    if ( props.currentPage >= 3 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                        pagesArr.push( 4 )
                    }
                }
                if( props.customization.pagesOnSides === 2 ) {
                    if ( props.currentPage >= 2 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                        pagesArr.push( 3 )
                    }
                    if ( props.currentPage >= 3 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                        pagesArr.push( 4 )
                    }
                    if ( props.currentPage >= 4 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                        pagesArr.push( 5 )
                    }
                } 
                if( props.customization.pagesOnSides >= 3 ) {
                    for( let i = props.customization.pagesOnSides; i <= ( props.customization.pagesOnSides + 2 ); i++ ) {
                        if ( props.currentPage >= 3 && props.currentPage <= ( props.customization.pagesOnSides + 2 ) ) {
                            pagesArr.push( i + 1 )
                        }   
                    }
                }
                pagesArr.push( '...' )
            }
        }     
        if ( props.currentPage > ( props.customization.pagesOnSides + 2 ) && props.currentPage < pagesCount.value - props.customization.pagesOnSides ) { // тут цифру 
            pagesArr.push( '...' )

            for ( let page = beforePages; page <= afterPages; page++ ) {
                pagesArr.push( page )
            }
            if ( props.currentPage !== pagesCount.value - ( props.customization.pagesOnSides + 1 ) ) { 
                pagesArr.push( '...' )
            }
        }

        //назад двигаемся 
        if ( props.currentPage >= pagesCount.value - props.customization.pagesOnSides ) { 
            pagesArr.push( '...' )
        }
        if ( props.currentPage === pagesCount.value - props.customization.pagesOnSides ) {
            pagesArr.push( props.currentPage - 1 )
        }
        if ( props.currentPage === pagesCount.value - ( props.customization.pagesOnSides - 1 ) ) { 
            pagesArr.push( props.currentPage - 1 )
        }
        if ( props.currentPage === pagesCount.value - props.customization.pagesOnSides ) {
            pagesArr.push( props.currentPage )
        }

        pagesArr.push( ...lastThreePages )

        return pagesArr
    } else {
        return pagesCount.value
    }
} )

</script>
