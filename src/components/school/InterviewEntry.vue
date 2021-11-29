<template>
  <div class="upload-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-upload
            class="upload-frame"
            drag
            list-type="text"
            accept=".xls,.xlsx"
            :action="UploadUrl()"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传xlsx、xls文件，且不超过10m <br>不会有人想手打上传吧，不会吧不会吧
            </div>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    UploadUrl() {},
  },
};
</script>

<style scope>
.upload-frame {
  margin-left: 445px;
}
</style>