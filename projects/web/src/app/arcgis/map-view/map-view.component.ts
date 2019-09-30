import {
    transition, trigger, useAnimation
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {
    Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';

import * as esri from 'esri-service';

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

    public state: any;

    @ViewChild('mapElement', { static: true }) public mapElement: ElementRef;

    private mapView: __esri.MapView;

    constructor(
        private http: HttpClient
    ) {
    }

    public async ngOnInit(): Promise<void> {
        try {
            const map = await esri.createMap({
                basemap: 'satellite'
            });
            const mapView = await esri.createMapView({
                container: this.mapElement.nativeElement,
                map,
                zoom: 7,
                center: { longitude: 113.2, latitude: 23.4 }
            });
            this.mapView = mapView;
            await mapView.when();
        }
        // tslint:disable-next-line:one-line
        catch (ex) {
            console.error(ex);
        }
    }

    public ngOnDestroy(): void {
        if (!this.mapView) {
            this.mapView.destroy();
        }
    }

}