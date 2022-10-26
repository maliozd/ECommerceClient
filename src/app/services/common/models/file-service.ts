import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/url/baseUrl';
import { HttpClientService } from '../http-client.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private httpClientService: HttpClientService) { }
    async getBaseStorageUrlAsync(): Promise<BaseUrl> {
        const observable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
            controller: "files",
            action: "GetBaseStorageUrl"
        })
        return await firstValueFrom(observable);
    }
}

