import {
  DirectionsRequest,
  DirectionsResponseData,
  Client as GoogleMapsClient,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async getDirections(originId: string, destinationId: string) {
    const params: DirectionsRequest['params'] = {
      origin: `place_id:${originId}`,
      destination: `place_id:${destinationId}`,
      key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      mode: TravelMode.driving,
    };

    const { data } = await this.googleMapsClient.directions({
      params,
    });

    return this.mountDirectionsResponse(data, params);
  }

  private mountDirectionsResponse(
    data: DirectionsResponseData,
    params: DirectionsRequest['params'],
  ) {
    return {
      ...data,
      request: {
        origin: {
          place_id: params.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: params.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: params.mode,
      },
    };
  }
}
