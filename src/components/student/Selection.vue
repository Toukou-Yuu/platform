<template>
  <div class="global_container">
    <div class="select_box">
      <div class="aspiration">
        <button class="as_btn" @click="return_to_aspiration()">志愿填写</button>
      </div>
      <div class="grade_search">
        <button class="grade_btn" @click="return_to_grade_search()">
          成绩查询
        </button>
      </div>
      <div class="info">
        <button class="info_btn" @click="return_to_info()">个人信息</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    return_to_aspiration() {},
    return_to_grade_search() {},
    return_to_info() {},
  },
};
</script>

<style scoped>
.global_container {
  position: absolute;
  /* background: linear-gradient(to bottom, #acb6e5, #86fde8); */
  /* background: linear-gradient(to right top, #fff7f0, #ffeeee); */
  /* background-image: url("../assets/imgs/login-background.jpg"); */
  background-color: #fff7f0;
  height: 100%;
  width: 100%;
}

.select_box {
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #bcc7c7;
  border-radius: 10px;
  box-shadow: 0 0 15px #bcc7c7;

  height: 300px;
  width: 600px;
}

.aspiration {
  position: relative;
  display: inline-block;

  background-color: #ece9e6;
  border-radius: 5px;

  margin: 90px 25px 90px 50px;
  height: 40%;
  width: 25%;
}

.grade_search {
  position: relative;
  display: inline-block;

  background-color: #ece9e6;
  border-radius: 5px;

  margin: 90px 25px 90px 25px;
  height: 40%;
  width: 25%;
}

.info {
  position: relative;
  display: inline-block;

  background-color: #ece9e6;
  border-radius: 5px;

  margin: 90px 50px 90px 25px;
  height: 40%;
  width: 25%;
}

.as_btn {
  border: 5px;
  border-radius: 5px;

  width: 100%;
  height: 100%;

  background-color: #ffe3ba;
  box-shadow: 0 0 5px #ffe3ba;

}

.grade_btn {
  border: 5px;
  border-radius: 5px;

  width: 100%;
  height: 100%;

  background-color: #c5605e;
  box-shadow: 0 0 5px #c5605e;
}

.info_btn {
  border: 5px;
  border-radius: 5px;

  width: 100%;
  height: 100%;

  background-color: #6b9ac9;
  box-shadow: 0 0 5px #6b9ac9;
}
</style>