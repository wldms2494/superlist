import { LightningElement, track , wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {

    selectedBoatTypeId='';

    error = undefined;

    @track
    searchOptions;

    @wire(getBoatTypes)
    boatTypes({data, error}){
        if(data) {
            this.searchOptions = data.map(type=>{
                return {label:type.Name, value: type.Id};
            });
            this.searchOptions.unshift({ label: 'All Types', value:''});
        } else if(error) {
            this.searchOptions = undefined;
            this.error = error;
        }
    }

    handleSearchOptionChange(event){
    
        this.selectedBoatTypeId = event.detail.value
        const searchEvent = new CustomEvent('search', {
            detail:{
                boateTypeId : this.selectedBoatTypeId
            }
        });
        this.dispatchEvent(searchEvent);
    }
}