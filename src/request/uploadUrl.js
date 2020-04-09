const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
]
// const uploadUrl="http://192.168.20.24:8089/";
function treeData(source, id, parentId, children , flag){
    let cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father=>{
        let branchArr = cloneData.filter(child => father[id] == child[parentId]);
        branchArr.length>0 ? father[children] = branchArr : ''
        return father[parentId] == flag        // 如果第一层不是parentId=0，请自行修改
    })
};
// const uploadUrl="http://192.168.30.36:8088/";
// const uploadUrl="";
// const uploadUrl="http://192.168.30.51:8090/";
// 测试
const uploadUrl="http://139.196.236.125:8080/";
// const uploadUrl="http://192.168.1.118:8080";

export default {
    uploadUrl,toolbarOptions,treeData
}
