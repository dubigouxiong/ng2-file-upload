1、安装ng2-file-upload模块

npm install ng2-file-upload --save
2、如果使用systemjs打包，需要在配置systemjs.config.js文件

A、在System.config的map字段中的最后一行输入以下字段：

'ng2-file-upload':'npm:ng2-file-upload'

B、在System.config的packages字段中的最后一行输入：

'ng2-file-upload': {    
    main: 'index.js',    
    defaultExtension: 'js'
}
3、在app.module.ts文件中，或者您有多个模块，在需要的模块中引入一下模块

import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

然后在@NgModule的imports字段中引用CommonModule和FileUploadModule。

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule
    ]
}
4、在自定义的上传组件中使用ng2-file-upload

import {Component, OnInit} from "@angular/core";
// A: 引入FileUpload模块
import {FileUploader} from "ng2-file-upload";
@Component({
    selector: "my-file",
    templateUrl: "./app/file.html"
})
export class HomeFileComponent implements OnInit {
    // B: 初始化定义uploader变量,用来配置input中的uploader属性
    public uploader:FileUploader = new FileUploader({
        url: "http://localhost:3000/ng2/uploadFile",
        method: "POST",
        itemAlias: "uploadedfile"
    });
    // C: 定义事件，选择文件
    selectedFileOnChanged(event:any) {
        // 打印文件选择名称
        console.log(event.target.value);
    }
    // D: 定义事件，上传文件
    uploadFile() {
        // 上传
        this.uploader.queue[0].onSuccess = function (response, status, headers) {
            // 上传文件成功
            if (status == 200) {
                // 上传文件后获取服务器返回的数据
                let tempRes = JSON.parse(response);
            } else {
                // 上传文件后获取服务器返回的数据错误
                alert("");
            }
        };
        this.uploader.queue[0].upload(); // 开始上传
    }
}
5、对应的html内容

<input type="file" ng2FileSelect [uploader]="uploader" (change)="selectedFileOnChanged($event)" />
selectedFileOnChanged($event)在 .ts文件中定义

selectedFileOnChanged(event: any) {
    console.log(event.target.value);
}
选择文件默认支持选择单个文件，如需支持文件多选，请在标签中添加multiple属性，即：

<input type="file" ng2FileSelect [uploader]="uploader" (change)="selectedFileOnChanged($event)" multiple />
6、拖拽上传文件

支持多文件拖拽上传

<div class="beforeDrop" ng2FileDrop [ngClass]="{dropping: isDropZoneOver}" (fileOver)="fileOverBase($event)" (onFileDrop)="fileDropOver($event)" [uploader]="uploader"><div>
在对应的 .ts文件中定义拖拽函数

fileOverBase(event) {
    // 拖拽状态改变的回调函数
}
fileDropOver(event) {
    // 文件拖拽完成的回调函数
}
7、文件上传

FileUploader有个数组类型的属性queue，里面是所有拖拽的和选择的文件，只要操作这个属性便可以进行文件上传。

uploadFileHandel() {
    this.uploader.queue[0].onSuccess = function (response, status, headers) {    
        // 上传文件成功   
        if (status == 200) {
            // 上传文件后获取服务器返回的数据
            let tempRes = JSON.parse(response);        
        }else {            
            // 上传文件后获取服务器返回的数据错误        
        }
    };
this.uploader.queue[0].upload(); // 开始上传
}
8、 详细介绍FileUpload

**初始化配置表**

参数名                 参数类型        是否是可选值       参数说明
allowedMimeType        Array<string>   可选值    
allowedFileType        Array<string>   可选值    允许上传的文件类型
autoUpload             boolean         可选值    是否自动上传
isHTML5                boolean         可选值    是否是HTML5
filters                Array           可选值    
headers                Array<Headers>  可选值    上传文件的请求头参数
method                 string          可选值    上传文件的方式
authToken              string          可选值    auth验证的token
maxFileSize            number          可选值    最大可上传文件的大小
queueLimit             number          可选值    
removeAfterUpload      boolean         可选值    是否在上传完成后从队列中移除
url                    string          可选值    上传地址
disableMultipart       boolean         可选值    
itemAlias              string          可选值    文件标记／别名
authTokenHeader        string          可选值    auth验证token的请求头
