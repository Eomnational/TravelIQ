from api.models import User

def changeSelfInfo(username,formData,file):
    print(formData)
    user = User.objects.get(username=username)
    user.address = formData['address']
    user.sex = formData['sex']
    if formData['textarea']:
        user.textarea = formData['textarea']
    if file.get('avatar') != None:
        user.avatar = file.get('avatar')

    user.save()

def getChangePassword(userInfo,passwordInfo):
    oldPwd = passwordInfo['oldPassword']
    newPwd = passwordInfo['newPassword']
    newPwdConfirm = passwordInfo['newPasswordConfirm']
    user = User.objects.get(username=userInfo.username)
    if oldPwd != userInfo.password:return '原始密码不正确'
    if newPwd != newPwdConfirm :return '两次密码输入不正确'

    user.password = newPwd
    user.save()
