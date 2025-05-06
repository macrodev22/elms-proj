<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import profilePhotoGeneric from '../assets/generic_profile_photo.jpg'

const store = useStore()

const initialDisplayedProfileImage = ref('')

    ; (() => {
        let userPic = store.auth.user.profile_picture
        if (!userPic) {
            initialDisplayedProfileImage.value = profilePhotoGeneric
            return;
        }
        fetch(userPic)
            .then(res => res.blob())
            .then(blob => {
                const fr = new FileReader()
                fr.addEventListener('load', () => {
                    initialDisplayedProfileImage.value = fr.result
                })
                fr.readAsDataURL(blob)
            }).catch(e => {
                initialDisplayedProfileImage.value = profilePhotoGeneric
            })
    })()
</script>
<template>

</template>