import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import {DeliveryPage} from "../delivery/delivery";
import { ToastController } from 'ionic-angular';
import {MapPage} from "../map/map";
import {
    NativeGeocoder,
    NativeGeocoderReverseResult,
    NativeGeocoderForwardResult,
    NativeGeocoderOptions
} from '@ionic-native/native-geocoder';
import {stringify} from "@angular/core/src/render3/util";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html',
})
export class LocationPage {
    pick_lat;
    delivery_lat;
    delivery_lng;
    address;
    street;
    pick_lng;

    pickupModel = {
        'street': '',
        'building': '',
        'postcode': '',
        'city': '',

    };
    deliveryModel = {
        'street': '',
        'building': '',
        'postcode': '',
        'city': '',

    };


    constructor(public toastController: ToastController,private httpclient:HttpClient, public navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public nativeGeocoder: NativeGeocoder, private storage: Storage) {
        console.log(navParams.get('address'));
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad LocationPage');
        console.log(this.navParams.get('address'));
        console.log('this address for delivery');
        console.log(this.navParams.get('delivery'));

        if (this.navParams.get('key') === 'pickup') {
            this.address = this.navParams.get('address');
            console.log('address');
            // fill all field here is pickup location
            let x = this.address.address.split(",");
            console.log('street', x[1]);
            console.log('building:-', x[0], x[2]);
            console.log('Postcode', this.address.postal);
            console.log('City', this.address.city);
            this.pickupModel.street = x[1];
            let y = x[0] + x[2];
            this.pickupModel.building = y;
            this.pickupModel.postcode = this.address.postal;
            this.pickupModel.city = this.address.city;

        } else {
            this.storage.get('temp_pickup_data')
                .then(data => {
                    console.log('Got Data', data);
                    if (data !== null)
                        this.pickupModel = data;
                    this.storage.set('pickup_location',this.pickupModel);

                }, error => console.error(error));

        }

        if (this.navParams.get('key') === 'delivery') {
            console.log('delivery');
            this.address = this.navParams.get('address');
            //fill all field here is delivery location
            let x = this.address.address.split(",");
            console.log('street', x[1]);
            console.log('building:-', x[0], x[2]);
            console.log('Postcode', this.address.postal);
            console.log('City', this.address.city);
            this.deliveryModel.street = x[1];
            let y = x[0] + x[2];
            this.deliveryModel.building = y;
            this.deliveryModel.postcode = this.address.postal;
            this.deliveryModel.city = this.address.city;
        } else {

            this.storage.get('temp_delivery_data')
                .then(data => {
                    console.log('Got Data', data);
                    if (data !== null)
                        this.deliveryModel = data;
                }, error => console.error(error));
        }
    }

    delivery(pickup_street:string,pickup_building:string,pickup_postcode:string,pickup_city:string,pickup_phone:string,pickup_door:string,pickup_note:string,delivery_street:string,delivery_building:string,delivery_postcode:string,delivery_city:string,delivery_phone:string,delivery_door:string,delivery_note:string)

        {
            this.storage.set('delivery_location',this.deliveryModel);
            console.log("Code" + pickup_postcode + "deloverycode"+delivery_postcode);
            if(pickup_street.length>0&&pickup_building.length>0&&pickup_postcode.length>0 &&pickup_city.length>0 &&pickup_city.length>0 &&pickup_phone.length>0 &&pickup_door.length && pickup_note.length>0&&delivery_street.length>0&&delivery_building.length>0&& delivery_postcode.length>0&&delivery_city.length>0&&delivery_phone.length>0&&delivery_door.length>0&&delivery_note.length>0)
            {

                this.httpclient.get('http://35.228.134.74/places').subscribe(
                    data => {
                        console.log("Hello catogeruy",data);
                        const myArray = JSON.parse(JSON.stringify(data));
                        let isPickupCodeExist :boolean;
                        let isDeliveryCodeExist :boolean;

                        for(var i = 0; i < myArray.length; i++) {
                            var obj = myArray[i];
                            if(obj.postcode==pickup_postcode){
                                isPickupCodeExist = true;
                            }
                            if(obj.postcode==delivery_postcode){
                                isDeliveryCodeExist = true;
                            }
                        }

                        if(isPickupCodeExist&& isDeliveryCodeExist){

                            const pickupAddress = {
                                building:pickup_building,
                                street: pickup_street,
                                city: pickup_city,
                                postcode:pickup_postcode,
                                telephone:pickup_phone,
                                pickup_door:pickup_door

                            };
                            const deliveryAddress = {
                                building:delivery_building,
                                street: delivery_street,
                                city: delivery_city,
                                postcode:delivery_postcode,
                                telephone:delivery_phone,
                                pickup_door:delivery_door

                            };

                            console.log('Pickup',this.pickupModel);
                            console.log('Delivery',this.deliveryModel);
                            this.storage.set('pickup_location',pickupAddress);
                            this.storage.set('delivery_location',deliveryAddress);

                            this.cordinate(pickupAddress.city, pickupAddress.postcode,'pickup');
                            this.cordinate(deliveryAddress.city, deliveryAddress.postcode,"delivery");
                            console.log("pick_lat",this.pick_lat);
                            console.log("pick_lat",this.pick_lng);

                            this.find_distance(this.pick_lat,this.pick_lng,this.delivery_lat,this.delivery_lng);


                            this.navCtrl.push(DeliveryPage);
                        }else {
                            console.log("Not Found");
                            let toast = this.toastController.create({
                                message: 'please enter a vaild pincode',
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();

                        }

                        console.log("Hello catogeruy2323",myArray);

                    },
                    (error1 => {
                        console.log("Error delivery",error1);


                    }));

            }
            else{
                let toast = this.toastController.create({
                    message: 'Kindly fill all details',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }



        }

    launchLocationPage(mKey) {

        this.storage.set('temp_pickup_data', this.pickupModel);
        this.storage.set('temp_delivery_data', this.deliveryModel);
        this.navCtrl.push(MapPage, {
            key: mKey
        });

    }



    cordinate(postcode:string,city:string,type:string){
        const url=`https://maps.google.com/maps/api/geocode/json?address=${postcode},${city}&key=`;
        this.httpclient.get(url).subscribe(data => {
            console.log('Cordinates Found for postcode'+postcode , data);
            if (type === 'pickup') {
                console.log("Pickup Details");
                this.pick_lat= data['results'][0]['geometry']['location']['lat'];
                this.pick_lng=data['results'][0]['geometry']['location']['lng'];
                console.log("pick_lat",this.pick_lat);
                console.log("pick_lng",this.pick_lng);
                console.log(typeof this.pick_lat);
                console.log(typeof this.pick_lng);
            }
            else {
                console.log("Delivery Details ");
                this.delivery_lat=data['results'][0]['geometry']['location']['lat'];
                this.delivery_lng=data['results'][0]['geometry']['location']['lng'];
                console.log('lat',data['results'][0]['geometry']['location']['lat']);
                console.log('lng',data['results'][0]['geometry']['location']['lng']);
                console.log("delivery_lat",this.delivery_lat);
                console.log("delivery_lng",this.delivery_lng);
                console.log(typeof this.delivery_lat);
                console.log(typeof this.delivery_lng);
            }
        });

    }

find_distance(origin_lat:string,origin_lng:string,destination_lat:string,destination_lng:string){
        console.log(this.pick_lng);
        console.log(this.delivery_lng)
    const distance_url=`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin_lat},${origin_lng}&destinations=${destination_lat},${destination_lng}&mode=driving&language=en&key=AIzaSyA_XcBoKwuHWib5qv0LZHa1YdshJRSK-Yw`;
    this.httpclient.get(distance_url).subscribe(data=>{
        console.log("output",data);
        console.log("distance_url",distance_url);
        // console.log('distance'+origin_lat,data);
    })

}

}
