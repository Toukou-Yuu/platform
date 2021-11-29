<template>
  <div>
    <div>
      <h2 class="global_title">招聘计划拟定</h2>
    </div>
    <el-card>
      <el-row class="warp">
        <el-col :span="22" class="warp-main">
          <el-form
            ref="infoForm"
            :model="infoForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="infoForm.title"></el-input>
            </el-form-item>

            <el-form-item label="说明" prop="description">
              <el-input v-model="infoForm.description"></el-input>
            </el-form-item>
            <!-- 使用编辑器 -->
            <el-form-item label="招聘计划">
              <div class="edit_container">
                <quill-editor
                  v-model="infoForm.content"
                  ref="myQuillEditor"
                  id="editer"
                  :options="editorOption"
                >
                </quill-editor>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit()">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      infoForm: {
        title: "",
        description: "",
        content: "",
      },
      editorOption: {
        moudules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              // [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image"],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector(".edit-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
                // this.$refs.aUpload.click() //自定义图片上传回调
              },
            },
          },
          // 语法高亮，代码适用
          // syntax: {
          //   highlight: (text) => hljs.highlightAuto(text).value,
          // },
        },
      },
      //表单验证
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          this.$post("?", this.infoForm).then((res) => {
            if (res.errCode == 200) {
              this.$message({
                message: res.errMsg,
                type: "success",
              });
              this.$router.push("?");
            } else {
              this.$message({
                message: res.errMsg,
                type: "error",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style>
.global_title {
  font-size: 30px;
  text-align: center;
  margin-bottom: 15px;
}
</style>