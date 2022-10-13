<templte>
    <div id="base">
        <div class="block">
            <h2>酒店客房服务系统</h2>
            <el-form
                ref="form"
                :model="form"
                label-position="top"
                label-width="80px"
            >
                <el-form-item label="手机号">
                    <el-input
                        v-model="form.phone"
                        placeholder="请输入手机号"
                        @blur="phoneTest"
                    ></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-row :gutter="100">
                        <el-col :span="16">
                            <el-input
                                v-model="form.code"
                                placeholder="请输入验证码"
                            ></el-input>
                        </el-col>
                        <el-button
                            type="primary"
                            @click="getCode"
                            :disabled="btnDisable"
                            >{{ codeBtn }}</el-button
                        >
                    </el-row>
                </el-form-item>
                <el-form-item style="display: flex; justify-content: center">
                    <el-button :type="type" @click="login" :disabled="disable"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
            <div class="bottom">
                <el-button type="success" size="mini">员工入口</el-button>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="dialog" width="30%">
            <span>{{ code }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="dialog = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</templte>

<script>
export default {
    data() {
        return {
            form: {
                phone: "",
                code: "",
            },
            disable: true,
            type: "primary",
            code: "",
            dialog: false,
            codeBtn: "获取验证码",
            btnDisable: true,
        };
    },
    methods: {
        phoneTest() {
            const test = /^1[1-9]{2}[0-9]{8}$/;
            if (!test.test(this.form.phone)) {
                this.disable = true;
                this.type = "danger";
                this.btnDisable = true;
                this.$message.error("手机号输入错误,请重新输入");
            } else {
                this.disable = false;
                this.type = "primary";
                if(this.codeBtn == "获取验证码"){
                    this.btnDisable = false
                }
            }
        },
        getCode() {
            this.code = Math.floor(Math.random() * 999998 + 100000);
            this.$message({
                message: "验证码已发送",
                type: "success",
            });
            let count = 30;
            this.btnDisable = true;
            let timer = setInterval(() => {
                this.codeBtn = count + "s后重试";
                count--;
                if (count <= 0) {
                    this.codeBtn = "获取验证码";
                    this.btnDisable = false;
                    clearInterval(timer);
                }
            }, 1000);
            setTimeout(() => {
                this.dialog = true;
            }, 2000);
        },
        login() {
            if (this.form.code == this.code) {
                this.$axios
                    .get("http://localhost:3000/user?phone=" + this.form.phone)
                    .then((res) => {
                        if (res.data[0]) {
                            this.$router.push("/userHome");
                        } else {
                            this.$message.error("您还不是本酒店客户");
                            this.form.code = "";
                            this.form.phone = "";
                            this.disable = true;
                        }
                    });
            } else {
                this.$message.error("验证码错误,请重新输入");
                this.form.code = "";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#base {
    width: 100%;
    height: 100%;
    background-color: aquamarine;
    display: flex;
    justify-content: center;
    align-items: center;
    .block {
        width: 400px;
        height: 500px;
        background-color: #fff;
        border-radius: 25px;
        display: flex;
        flex-flow: column wrap;
        padding: 30px;
        h2 {
            text-align: center;
        }
        div.el-form-item {
            margin-top: 40px;
        }
        .bottom {
            margin-top: 70px;
            display: flex;
            justify-content: center;
        }
    }
}
</style>