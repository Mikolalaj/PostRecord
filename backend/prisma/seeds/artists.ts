import { prisma } from '../../src/app'

export async function createArtists() {
    await prisma.artist.upsert({
        where: { id: 'd707eaa8-676a-4209-b0a4-348f525f85a0' },
        update: {},
        create: {
            id: 'd707eaa8-676a-4209-b0a4-348f525f85a0',
            spotifyId: '00FQb4jTyendYWaN8pK0wa',
            name: 'Lana Del Rey',
            image: 'https://i.scdn.co/image/ab67616100005174b99cacf8acd5378206767261',
            bio: 'Elizabeth Woolridge Grant, known professionally as Lana Del Rey, is an American singer-songwriter and producer. Her music is noted for its cinematic quality and exploration of tragic romance, glamour, and melancholia, with frequent references to contemporary pop culture and 1950s–1960s Americana. Raised in upstate New York, Del Rey moved to New York City in 2005 to pursue a music career. After numerous projects, including her self-titled debut studio album, Del Rey\'s breakthrough came in 2011 with the viral success of her single "Video Games"; she subsequently signed a recording contract with Polydor and Interscope. She achieved critical and commercial success with her second album, Born to Die (2012), which contained the sleeper hit "Summertime Sadness". Del Rey\'s third album, Ultraviolence (2014), featured greater use of guitar-driven instrumentation and debuted atop the U.S. Billboard 200. Her fourth and fifth albums, Honeymoon (2015) and Lust for Life (2017), saw a return to the stylistic traditions of her earlier releases, while her critically acclaimed sixth album, Norman Fucking Rockwell! (2019), explored soft rock. Her next studio albums, Chemtrails Over the Country Club and Blue Banisters, followed in 2021. Her ninth studio album, “Did you know that there\'s a tunnel under Ocean Blvd” was released on all platforms on the date of March 24th 2023. It includes singles like the title track - "Did you know that there\'s a tunnel under Ocean Blvd", "A&W", and "The Grants". Del Rey has collaborated on soundtracks for visual media; in 2013, she wrote and starred in the critically acclaimed musical short Tropico and released "Young and Beautiful" for the romantic drama The Great Gatsby. In 2014, she recorded "Once Upon a Dream" for the dark fantasy adventure film Maleficent and the self-titled theme song for the biopic Big Eyes. Del Rey collaborated with Ariana Grande and Miley Cyrus on "Don\'t Call Me Angel" for the action comedy Charlie\'s Angels (2019), which peaked at number 13 on the U.S. Billboard Hot 100. Additionally, Del Rey published the poetry and photography collection Violet Bent Backwards Over the Grass (2020). She is the recipient of various accolades, including two Brit Awards, two MTV Europe Music Awards, and a Satellite Award, in addition to nominations for six Grammy Awards and a Golden Globe Award. Variety honored her at their Hitmakers Awards for being "one of the most influential singer-songwriters of the 21st century". Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
        },
    })
    await prisma.artist.upsert({
        where: { id: '21ef71ee-8a1c-46be-b7f8-9f742e50826e' },
        update: {},
        create: {
            id: '21ef71ee-8a1c-46be-b7f8-9f742e50826e',
            spotifyId: '4NZvixzsSefsNiIqXn0NDe',
            name: 'Maggie Rogers',
            image: 'https://i.scdn.co/image/ab67616100005174b3e3db4f0aec872ec513b3c0',
            bio: 'Maggie Rogers (born Margaret Debay Rogers on April 25, 1994) is an American musician, singer-songwriter, and producer from Easton, Maryland. She rose to fame after her song "Alaska" was played to Pharrell Williams during a master class at New York University. Her songs "Alaska" and "Dog Years" placed numbers 64 and 173 on Triple J Hottest 100, 2016, respectively. After the Pharrell video went viral, several different record labels tried to sign Rogers. She ended up negotiating a contract with Capitol Records where "she licenses her music to them through her own imprint, Debay Sounds." As a result, she has more control over her sound and image than many artists at a similar place in their music careers. Rogers\'s EP, Now That the Light Is Fading, was released on February 17, 2017. She released her major-label debut album, Heard It In a Past Life, in January 2019. The album debuted at number two on the US Billboard 200.\nShe made her television debut on The Tonight Show Starring Jimmy Fallon on February 15, 2017, Saturday Night Live debut on November 3, 2018 and Today Show debut on July 12, 2019.\nShe cites Carrie Brownstein, Patti Smith, Kim Gordon, and Björk as her musical inspirations, while prominent singers Brandi Carlile and Sharon Van Etten - who she calls her "musical big sisters" - have become mentors. She also mentioned in her initial conversation with Williams that she has synesthesia, a benign condition where one or more senses is perceived at once. In her case, she is able to perceive colours as a response to hearing music. Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
        },
    })
    await prisma.artist.upsert({
        where: { id: 'b550927e-fc9a-4312-959f-500f17c1caac' },
        update: {},
        create: {
            id: 'b550927e-fc9a-4312-959f-500f17c1caac',
            spotifyId: '06HL4z0CvFAxyc27GXpf02',
            name: 'Taylor Swift',
            image: 'https://i.scdn.co/image/ab676161000051746a224073987b930f99adc706',
            bio: 'Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting, which is often inspired by her personal life, has received widespread media coverage and critical praise. Born in West Reading, Pennsylvania, Swift relocated to Nashville, Tennessee in 2004 to pursue a career in country music. She broke into the country music scene with her eponymous self-titled debut studio album, Taylor Swift in 2006, which included the singles "Teardrops on My Guitar" and "Our Song". Swift also released the holiday album, Sounds of the Season: The Taylor Swift Holiday Collection, later titled as The Taylor Swift Holiday Collection in October 2007.\nSwift rose to mainstream prominence with her sophomore studio album, Fearless (2008), a country pop record with crossover appeal. Aided by the top-five singles "Love Story" and "You Belong with Me", Fearless was certified Diamond by the Recording Industry Recording Industry Association of America (RIAA). Swift\'s third studio album, Speak Now (2010), blended country pop with elements of rock and featured the top-ten singles "Mine" and "Back to December".\nDrawing inspiration from various pop, rock, and electronic genres, Swift\'s fourth studio album Red (2012) saw her transcending her country roots. She completely moved to pop with her synth-pop fifth studio album, 1989 (2014), and expanded the electropop sound on her next two studio albums, reputation (2017) and Lover (2019), which respectively embraced urban and retro styles. The four albums spawned a string of international top-five singles, including "We Are Never Ever Getting Back Together", "I Knew You Were Trouble", "Shake It Off", "Blank Space", "Bad Blood", "Look What You Made Me Do", "ME! (feat. Brendon Urie of Panic! at the Disco)", "You Need to Calm Down", and "Lover". ',
        },
    })
    await prisma.artist.upsert({
        where: { id: '273cc6f3-fa78-4f78-98fb-7c693975bcfe' },
        update: {},
        create: {
            id: '273cc6f3-fa78-4f78-98fb-7c693975bcfe',
            spotifyId: '2WX2uTcsvV5OnS0inACecP',
            name: 'Birdy',
            image: 'https://i.scdn.co/image/ab67616100005174778483686ae247c1906f02fb',
            bio: 'UK singer-songwriter Jasmine Van den Bogaerde. Birdy was born on May 15th, 1996, to a concert pianist, Sophie Roper-Curzon and a writer, Rupert Bogarde. She was raised in a mill house on the Pylewell Park estate (Lymington, UK) of Birdy’s maternal grandfather, Baron Teynham. She attended Priestlands School in Lymington, UK until the age of 16, before going on to Brockenhurst Sixth Form College to study for her A-levels. In 2011, at the age of 14, she released Bon Iver-cover track "Skinny Love", which reached #17 on the UK Singles Chart. After she won the Under 18s category of the UK talent contest Open Mic UK at the age of 12, Bogaerde was soon offered a publishing contract by Good Soldier Songs Ltd, run by Christian Tattersfield, chairman of Warner Music UK.\nHer self-titled debut album, "Birdy", was released on November 7, 2011 and featured "Skinny Love" and "1901".\nHer second studio album, "Fire Within", was released September 23, 2013. It featured 11 original songs, either written or co written by Birdy including Strange Birds, co-written with  Sia. \nOn March 25th 2016, Birdy\'s third album "Beautiful Lies" was released, it featured the singles, "Keeping Your Head Up" and "Wild Horses" Once again her songwriting abilities were evident as she wrote or co wrote all of the 14 tracks.\nAlso in 2016 she was featured on the Sigma single, Find Me which was only a minor success in the UK. Her song Ghost In The Wind" also appeared on the soundtrack of the film The Edge Of Seventeen  \nBogaerde\'s music is described as folk, pop, indie folk. She cites her early music influences as Classical Music and Pop music that her parents would play. along with her own influences, which are so evident in her music(Bon Iver, George Michael and Keane)',
        },
    })
    await prisma.artist.upsert({
        where: { id: 'a4bb6aab-4b55-46b3-8c4d-3d0f0a096763' },
        update: {},
        create: {
            id: 'a4bb6aab-4b55-46b3-8c4d-3d0f0a096763',
            spotifyId: '1hLiboQ98IQWhpKeP9vRFw',
            name: 'boygenius',
            image: 'https://i.scdn.co/image/ab676161000051741a6373c01e8b86e289859f57',
            bio: 'American indie singer-songwriters Julien Baker, Phoebe Bridgers and Lucy Dacus formed themselves a band under the name boygenius. Their first EP, the eponymous boygenius, was released in November 2018. “When we met, Lucy and Phoebe and I were in similar places in our lives and our musical endeavours, but also had similar attitudes toward music that engendered an immediate affinity”, says Baker. “Lucy and Phoebe are incredibly gifted performers, and I am a fan of their art outside of being their friends, but they are also both very wise, discerning and kind people whom I look up to in character as much as in talent."\nThe trio released their first full length album, the record, on the 31st of March, 2023. Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
        },
    })
    await prisma.artist.upsert({
        where: { id: 'fdfd36d6-4cb7-4b5b-a508-aff67ceedccd' },
        update: {},
        create: {
            id: 'fdfd36d6-4cb7-4b5b-a508-aff67ceedccd',
            spotifyId: '2FXC3k01G6Gw61bmprjgqS',
            name: 'Hozier',
            image: 'https://i.scdn.co/image/ab67616100005174ad85a585103dfc2f3439119a',
            bio: 'Andrew Hozier-Byrne (born 17 March 1990), known mononymously as Hozier, is an Irish musician and singer-songwriter from Bray, County Wicklow, Ireland. In 2013 he released his debut EP, featuring the hit single "Take Me to Church", and his second EP "From Eden" in 2014. His debut studio album, "Hozier", was released in Ireland in September 2014 and globally in October 2014. Hozier was born in Bray, County Wicklow, Ireland.  His mother is the visual artist Raine Hozier-Byrne (who also designed his latest album cover). He began a degree in music at Trinity College, Dublin, but dropped out midway through his first year in order to record demos for Universal Music. While at Trinity, he became involved with the Trinity Orchestra. He was a member of Anúna from 2008 to 2012, and appears as a soloist on their 2012 release "Illumination" singing "La Chanson de Mardi Gras". He toured and sang with the group internationally including performances in Norway and the Netherlands.\nIn 2013, Hozier released the EP "Take Me to Church EP" (also containing "Like Real People Do", "Angel of Small Death and The Codeine Scene" and a live version of "Cherry Wine"), with the title track becoming his breakthrough single after it went viral on YouTube. It reached number one on the Irish iTunes singles chart and number two in the official chart on 25 October 2013. \nHozier followed up Take Me to Church with the new EP "From Eden EP" (also containing "Work Song", "Arsonist\'s Lullabye" and a live version of "To Be Alone"), and a number of festival tour dates and television appearances in the United States. Hozier released his self-titled album, "Hozier" on 19 September 2014. It had five singles including "Take Me to Church", "Work Song", and "From Eden", which were hits on his earlier EPs. On December 2014, it was announced that "Take Me to Church" was nominated at the 57th Annual Grammy Awards for Song of the Year in 2015.\nIn September 2018, he released an EP titled Nina Cried Power and featured the title track as a single, reaching number one on the Billboard Adult Alternative Songs chart. He released his second album, Wasteland, Baby! in March 2019, which debuted atop the Irish Albums Chart and the Billboard 200, and has since been certified gold in the U.S.',
        },
    })
}