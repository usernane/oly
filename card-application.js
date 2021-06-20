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
        img_obj: new Image(),
        allowed_dim:{
            width:400,
            height:400
        },
        text_properties:{
            color:'#000',
            size:20,
            font:'Times New Roman',
            position:{
                x:300,
                y:25
            },
        },
        fill_style:'rgba(255, 0, 0, 0.5)'
    },
    computed:{
        canvas_context:function() {
            return document.getElementById('img-canvas').getContext('2d');
        },
    },
    mounted:function() {
        var thisVue = this;
        this.img_obj.onload = function() {
            console.log('Width: '+this.width);
            console.log('Height: '+this.height);
            thisVue.canvas_context.drawImage(thisVue.img_obj, 0, 0, thisVue.allowed_dim.width, thisVue.allowed_dim.height);
        };
    },
    methods:{
        saveAsJpg:function() {
            var anchor = document.createElement('a');
            anchor.setAttribute('download', 'GreetingsCard.jpg');
            anchor.setAttribute('href', document.getElementById('img-canvas').toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
            anchor.click();
        },
        saveAsPDF:function() {
            var pdf = new jspdf.jsPDF();
            pdf.addImage(document.getElementById('img-canvas').toDataURL("image/jpg"), 'JPEG', 0, 0);
            pdf.save("GreetingsCard.pdf");
        },
        drawText:function() {
            var txt = this.text_on_img;
            if (txt === null || txt.trim().length === 0) {
                return;
            }
            var context = this.canvas_context;
            
            
            
            context.drawImage(this.img_obj, 0, 0, this.allowed_dim.width, this.allowed_dim.height);
            
            context.strokeStyle = "red";
            context.moveTo(255, 20);
            context.lineTo(255, 270);
            context.stroke();
            
            context.fillStyle = this.text_properties.color;
            
            context.fillText(txt.trim(), this.text_properties.position.x, this.text_properties.position.y);
            
            context.textAlign = "center";   
            
            context.fillText(this.text_on_img,255, 160);
            
            //Add shadow effect
            context.shadowOffsetX = this.text_properties.position.width + 2;
            context.shadowOffsetY = this.text_properties.position.height + 22;
            context.shadowBlur = 2;
            context.shadowColor = 'rgba(0, 0, 0, 0.5)';
            context.font = this.text_properties.size+'pt '+this.text_properties.font;
        },
        imageSelected:function() {
            if (this.image_file !== null) {
                console.log('Image selected.');
                var fileReader = new FileReader();
                var thisVue = this;
                fileReader.onload = function() {
                    thisVue.img_obj.src = this.result;
                };
                fileReader.readAsDataURL(this.image_file);
                this.drawText();
                return true;
            } else {
                console.log('No image is selected.');
                this.img_data = null;
                return 'هذا الحقل مطلوب.';
            }
        },
        validateWidthAndHeight:function() {
            return true;
        },
    }
});