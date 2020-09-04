import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {

    render() {
        return (
            <html>
            <Head>
                <link rel='stylesheet' type='text/css' href='/static/css/nprogress.css'/>
                <link rel='stylesheet' type='text/css' href='/static/css/react-datepicker.css'/>
                <script src="https://embed.runkit.com"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNj3GcXDd-yv8C4QZzMadtshaXsWRehrA&libraries=places" type="text/javascript"></script>
            </body>
            </html>
        )
    }
}
