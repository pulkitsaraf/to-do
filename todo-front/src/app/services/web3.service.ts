import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Web3Service {
    baseUrl = "http://localhost:3000/api/"
constructor(private http: HttpClient) { }

   
    createTask(name) {
        return this.http.post(this.baseUrl + 'task', {"name":name});
    }

    assignTask(taskId,toAddress) {
        return this.http.put(this.baseUrl + 'task/assign', {"taskId":taskId,"toAddress":toAddress});
    }

    
    markTaskComplete(taskId) {
        return this.http.put(this.baseUrl + 'task/status', {"taskId":taskId});
    }
   
}
