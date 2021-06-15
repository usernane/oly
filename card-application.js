var app = new Vue({
    el:'#card-application',
    vuetify: new Vuetify({
        rtl:true,
        theme: {
            dark:true,
            themes:{
                dark:{
                    
                },
                light:{
                    
                }
            }
        }
    }),
    data:{
        image_file:null,
        text_on_img:null,
        img_data:null
    },
    methods:{
        imageSelected:function() {
            if (this.image_file !== null) {
                console.log('Image selected.');
                var fileReader = new FileReader();
                var thisVue = this;
                fileReader.onload = function() {
                    thisVue.img_data = this.result;
                };
                fileReader.readAsDataURL(this.image_file);
            } else {
                console.log('No image is selected.');
                this.img_data = null;
            }
        }
    }
});