import uuid

songs = []
album_id = "d3e7cbef-5970-4712-ac1f-4b858539aab0"


def generate_commands(song):
    track_id = str(uuid.uuid4())
    duration_seconds = song["duration_ms"] // 1000

    command_template = """await prisma.track.upsert({
        where: { id: '%s' },
        update: {},
        create: {
            id: '%s',
            title: '%s',
            number: %d,
            spotifyId: '%s',
            duration: %d,
            album: {
                connect: { id: '%s' },
            }
        },
    })"""

    command = command_template % (
        track_id,
        track_id,
        song["name"],
        song["track_number"],
        song["id"],
        duration_seconds,
        album_id,
    )
    return command


for song in songs:
    command = generate_commands(song)
    print(command)
