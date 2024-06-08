# Yêu cầu

- NodeJs: https://nodejs.org/en/

- Cách lấy ID Discord: https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-

- Có 1 trình edit để sửa file, nếu không có thì dùng notepad cũng được.

# Cài đặt

- 1. Mở cmd: Windows Search + tìm 'cmd'

- 2. Gõ node -v kiểm tra version của nodejs, nếu phản hồi lại là có dạng như 'v15.10' thì là ok.

- 3. Điều hướng đến thư mục này bằng cách gõ 'cd + {đường dẫn thư mục}'

```
Ví dụ: cd C:\Users\Public\Desktop
```

- 4. Gõ npm i, đợi cài đặt xong thì tắt

## Setup token & env

- Bước 1: Ctrl + Shift + I trên trình duyệt. Chọn Network -> Fetch/XHR -> Chọn 1 trường bất kỳ và tìm trong Request Headers

```
    authorization: "****************************"
    Cái *** là token của bạn.
```

hoặc bạn có thể chuyển qua tab console rồi chạy đoạn code sau. Sau khi chạy xong thì token sẽ ở trong clipboard luôn (tự được copy)
```
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

- Bước 2: Lấy TOKEN của user muốn auto (để đảm bảo an toàn sau khi lấy token KHÔNG share Token cho người khác)

- Bước 3: Tạo 1 file là `.env` tương tự envSample

        3.1: Điền Token acc spam (TOKEN=...)
        3.2: Điền ID kênh spam (CHANNEL=...)
        3.3: Điền ID owner (acc bạn gửi noti khi có captcha) (OWNER=...)
        
    > - TH1 : Chỉ dùng 1 acc để auto và acc đó là owner thì điền ID là acc đó luôn vào chỗ "owner".

    > - TH2 : Có 2 acc :  1 acc spam và 1 acc owner để bắn noti thì điền "owner" là ID của acc owner.

    > Ưu tiên cách 2 hơn vì nó bắn noti trên PC sẽ biết lúc nào dính captcha để mình còn xử lý.
    > Khi bị dính captcha bot sẽ tự dừng auto lại và acc spam gửi captcha về tin nhắn riêng của owner, tại acc owner bạn trả lời tin nhắn vừa được acc spam gửi hoặc có thể login vào acc spam trả lời captcha.

- Bước 4: Điền thông tin vào `info.json`

        4.1: Bật tắt các lệnh muốn spam, với false là bật, true là tắt
        4.2: List gem bạn muốn sử dụng. Ở đây sử dụng chung cùng 1 cấp gem.
            (Những số có thể điền trong list gem có thể điền là 51 52 53 54 55 56 57)

- Bước 5: Config thêm nếu bạn muốn chạy nhiều acc

Nếu muốn thêm nhiều nick thì bạn có thể làm thế này. 
Nhớ sửa .env thành
```
CHANNE1L=...
OWNER1=...
TOKEN1=...
CHANNEL2=...
OWNER2=...
TOKEN2=...
```

```
try {
    runClient...(
        process.env.CHANNEL1,
        process.env.OWNER1,
        process.env.TOKEN1,
        new Client({
            checkUpdate: false,
        })
    );
    runClient...(
        process.env.CHANNEL2,
        process.env.OWNER2,
        process.env.TOKEN2,
        new Client({
            checkUpdate: false,
        })
    );
    // ... etc account

} catch (error) {
    console.log(error);
}
```

- Bước 6: Chạy file `start.bat`. Sau đó chọn mode bạn muốn chạy (có 2 mode). Khi nào không chạy nữa thì tắt cửa sổ đi là được.

### 1. Chạy mode schedule (hunt bot theo giờ trong ngày)

Mở file `clientSchedule.js`. Dòng 12 và Dòng 164 -> 169 config giờ hunt bot theo khung giờ 24h
```
wakeUpRule.hour = [1, 4, 7, 10, 12, 15];
...
hour === 1 ||
hour === 4 ||
hour === 7 ||
hour === 10 ||
hour === 12 ||
hour === 15
...
```

### 2. Chạy mode continuous (hunt bot liên tục)

# Commands start - stop:

`spy!stop` để dừng lại <br>
`spy!cont` để tiếp tục
