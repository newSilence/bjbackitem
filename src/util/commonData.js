export const toolbarOptions = [
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
export const proTemplate = `
		<div style="text-align:left;"><img src="http://139.196.236.6:8090/img/publish/5.png" alt="" style="height: 30px;width: 106px;float: left;"></div>
		<p>请输入您的背景描述</p>
		<div style="text-align:left;"><img src="http://139.196.236.6:8090/img/publish/6.png" alt="" style="height: 30px;width: 106px;float: left;"></div>
		<p>请输入您的团队介绍</p>
		<div style="text-align:left;"><img src="http://139.196.236.6:8090/img/publish/7.png" alt="" style="height: 30px;width: 106px;float: left;"></div>
		<p>请输入您的技术成果</p>
		<div style="text-align:left;"><img src="http://139.196.236.6:8090/img/publish/8.png" alt="" style="height: 30px;width: 106px;float: left;"></div>
		<p>请输入您的前景展望</p>`;