<template>
    <div class="news" style="overflow:auto">
        <el-form :model="searchForm" :inline="true" ref="searchForm" label-width="100px">
            <el-form-item label="资讯类别：">
                <el-select v-model="searchForm.category" placeholder="请选择活动区域">
                    <el-option v-for="(item,index) in newsCategoryData" :key="index" :label="item.key" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="addNews" type="primary">新增</el-button>
            </el-form-item>
        </el-form>


        <el-table :data="tableData" style="width: 100%;">
            <el-table-column
                type="index"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                width="">
            </el-table-column>
            <el-table-column
                prop="category"
                label="资讯类别">
            </el-table-column>
            <el-table-column
                prop="resource"
                label="信息来源">
            </el-table-column>
            <el-table-column
                prop="uname"
                label="操作者">
            </el-table-column>
            <el-table-column
                prop="submittime"
                label="发布时间">
            </el-table-column>
        </el-table>
        <!-- 新闻的弹框 -->
        <el-dialog title="资讯管理" :visible.sync="dialogFormVisible" :before-close="closeDialog">
            <el-form v-if="dialogFormVisible" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="资讯类别" prop="category">
                    <el-col :span="10">
                        <el-select @change="categoryChange" style="width:100%" v-model="ruleForm.category" placeholder="请选择资讯类别">
                            <el-option v-for="(item,index) in newsNoAllCategoryData" :key="index" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-col :span="10">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item v-if="ruleForm.category!='下载中心'" label="摘要" prop="summary">
                    <el-col :span="10">
                        <el-input v-model="ruleForm.summary"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="信息来源" prop="resource">
                    <el-col :span="10">
                        <el-input v-model="ruleForm.resource"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-form-item prop="publishDate">
                        <el-col :span="10">
                            <el-date-picker value-format="yyyy-MM-dd" style="width:100%" placeholder="选择时间" v-model="ruleForm.publishDate"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form-item>
                <el-form-item key="热点新闻" v-if="ruleForm.category=='热点新闻'" label="封面图" prop="delivery">
                    <el-upload
                        class="upload-demo"
                        :action="baseUrl+'/fileUpload'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :file-list="fileList"
                        :limit="1"
                        :on-exceed="handleExceed"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                 <el-form-item key="下载中心" v-if="ruleForm.category=='下载中心'" label="附件上传" prop="delivery">
                    <el-upload
                        class="upload-demo"
                        :action="baseUrl+'/document/upDocument/'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :file-list="fileList"
                        :limit="1"
                        :on-exceed="handleExceed"
                        list-type="text">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item  class="edit_container">
                    <el-upload
                        class="avatar-uploader quill-img"
                        :action="baseUrl+'/fileUpload'"
                        :show-file-list="false"
                        :on-success="quillImgSuccess"
                        >
                    </el-upload>
                    <quill-editor 
                        v-model="ruleForm.detail" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
            </el-form>
            <!-- {{ruleForm.detail}} -->
            <!-- <div  class="ql-editor" v-html="ruleForm.detail">
                
            </div> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { addNewsForm , searchNewsTable , addUploadForm } from "./app.js"
    import  uploadUrl  from '@/request/uploadUrl'
    export default {
        data() {
            return {
                editorOption: {
                    placeholder: '',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                    toolbar: {
                        container: uploadUrl.toolbarOptions,  // 工具栏
                        handlers: {
                        'image': function (value) {
                        if (value) {
                            // 触发input框选择图片文件
                            document.querySelector('.quill-img input').click()
                        } else {
                            this.quill.format('image', false);
                        }
                        }
                        }
                    }
                    }
                },
                baseUrl:uploadUrl.uploadUrl,
                // baseUrl:'http://192.168.20.24:8088/',
                rowId:'',//根据rowId判断是编辑还是新增
                newsCategoryData:[
                    {key:'全部',value:''},
                    {key:'热点新闻',value:'热点新闻'},
                    {key:'科技动态',value:'科技动态'},
                    {key:'国内政策',value:'国内政策'},
                    {key:'本地政策',value:'本地政策'},
                    {key:'政策解读',value:'政策解读'},
                    {key:'通知公告',value:'通知公告'},
                    {key:'下载中心',value:'下载中心'},
                ],
                tableData:[],
                dialogFormVisible:false,
                searchForm: {
                    category:'',
                },
                fileList:[],
                ruleForm:{
                    category:'',
                    title:'',
                    cover:'',
                    newsImgurl:'',
                    resource:'',
                    publishDate:'',
                    detail:'',
                    summary:'',
                    uName:'ceshi02'
                },
                rules:{
                    title: [
                        { required: true, message: '请输入资讯标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    resource: [
                        { required: true, message: '请输入资讯来源', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: '请输入资讯摘要', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '请选择资讯类别', trigger: 'change' }
                    ],
                    publishDate: [
                        {  required: true, message: '请选择发布时间', trigger: 'change' }
                    ],
                    detail: [
                        { required: true, message: '请输入资讯详情', trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
            newsNoAllCategoryData() {
                return this.newsCategoryData.slice(1) 
            }
        },
        methods: {
            //获取数据
            fetchData(){
                let param={
                    pageNum:1,
                    pagesize:100
                };
                searchNewsTable(param).then(res=>{
                    console.log("fetchData",res);
                    this.tableData=res.data.data.list;
                })
            },
            addNews() {
                this.dialogFormVisible=true;
                console.log("新增新闻")
            },
            closeDialog(){
                console.log('关闭');
                for(let key in this.ruleForm){
                    if(Array.isArray(this.ruleForm[key])){
                        this.ruleForm[key]=[]
                    }else{
                        this.ruleForm[key]=''
                    }
                }
                this.dialogFormVisible=false;
                
                console.log(open);
            },
            //富文本编辑器事件
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },
            quillImgSuccess(res, file) { // 富文本编辑框图片上传
                // console.log(URL.createObjectURL(file.raw));
                // this.form.icon = URL.createObjectURL(file.raw);
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                console.log(res);
                // 如果上传成功
                if (res.code == '0') {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.data为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', this.baseUrl+res.data)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
            },
            //图片上传事件
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.fileList=[];
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleSuccess(res, file, fileList) {
                // console.log("success");
                console.log(res.data);
                // return;
                if(res.code==0){
                    console.log(this.fileList);
                    console.log("success")
                    this.ruleForm.cover=this.baseUrl+res.data;
                }else{
                    this.fileList=[];
                    this.ruleForm.cover='';
                }
                console.log(res);
                console.log(file);
                console.log(fileList);
                // console.log(response, file, fileList);
            },
            handleError(err, file, fileList) {
                console.log("error");
                this.ruleForm.cover='';
                console.log(err, file, fileList);
            },
            //类别切换事件
            categoryChange(item){
                console.log(item);
                this.ruleForm.cover='';
                this.fileList=[];
            },
            //编辑或者新增
            confirm() {
                console.log(this.ruleForm);
                // return false;
                this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm);
                    this.ruleForm.uName="ceshi02";
                    // console.log('addNewsForm',addNewsForm);
                    let addUrlInter=this.ruleForm.category=="下载中心"?addUploadForm:addNewsForm;
                    addUrlInter(this.ruleForm).then(res=>{
                        console.log(res);
                        if(res.data.code=='0'){
                            this.closeDialog();
                            this.fetchData();
                        }
                    })
                    // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
        },
        mounted () {
            console.log("consultManage mounted");
        },
        created () {
            console.log("baseUrl",uploadUrl.uploadUrl);
            console.log(this);
            this.fetchData();
        },
    }
</script>

<style>
.news .ql-editor{
    height:300px
}
</style>