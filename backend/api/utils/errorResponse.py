from django.shortcuts import render,redirect

def errorResponse(request,errorMsg):
    return render(request,'404.html',{
        'errorMsg':errorMsg
    })