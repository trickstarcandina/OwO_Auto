# Yêu cầu

> - NodeJs: https://nodejs.org/en/

> - Cách lấy ID Discord: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-

> - Có 1 trình edit để sửa file, nếu không có thì dùng notepad cũng được.

# OwO Version2

> - Bước 1: Ctrl + Shift + I trên trình duyệt. Chọn Network -> Fetch/XHR -> Chọn 1 trường bất kỳ và tìm trong Request Headers

    authorization: "****************************"
    Cái *** là token của bạn.

> - Bước 2: Lấy TOKEN của user muốn auto (để đảm bảo an toàn sau khi lấy token KHÔNG share Token cho người khác)

> - Bước 3: Điền thông tin vào `info.json`

        3.1: Điền Token acc spam
        3.2: Điền ID kênh spam
        3.3: Điền ID owner (acc bạn gửi noti khi có captcha)
        3.4: Bật tắt các lệnh muốn spam, với false là bật, true là tắt
        3.5: List gem bạn muốn sử dụng. Ở đây sử dụng chung cùng 1 cấp gem.
            (Những số có thể điền trong list gem có thể điền là 51 52 53 54 55 56 57)

    TH1 : Chỉ dùng 1 acc để auto và acc đó là owner thì điền ID là acc đó luôn vào chỗ "owner".
    TH2 : Có 2 acc :  1 acc spam và 1 acc owner để bắn noti thì điền "owner" là ID của acc owner.
    > Ưu tiên cách 2 hơn vì nó bắn noti trên PC sẽ biết lúc nào dính captcha để mình còn xử lý.

> - Bước 4: Chạy file `start.bat`

### Khi bị dính captcha bot sẽ tự dừng auto lại và acc spam gửi captcha về tin nhắn riêng của owner, tại acc owner bạn trả lời tin nhắn vừa được acc spam gửi hoặc có thể login vào acc spam trả lời captcha.

## Commands:

`spy!stop` để dừng lại <br>
`spy!cont` để tiếp tục

# OwO Version2

Version này config giống version trước nhưng khác ở chỗ là version này spam theo giờ cố định bạn đặt từ trước, ngoài thời gian đó sẽ không spam.
Nó có lợi trong trường hợp bạn có thể bật máy cả ngày và không có muốn ngồi canh captcha, tất nhiên là cũng sẽ có lúc bot sẽ gửi captcha, việc ngắt thời gian chỉ giảm thiểu chứ không tránh được.

> - Bạn copy trong thư mục 'version_new' file 'index2.js' ra ngoài thư mục OwO
> - Đổi tên 'index.js' thành 1 tên khác, đổi tên 'index2.js' thành 'index.js'
