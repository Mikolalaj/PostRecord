import QueryRenderer from 'components/common/QueryRenderer'
import Collection from 'components/profile/Collection'
import UserInfo from 'components/profile/UserInfo'
import Wantlist from 'components/profile/Wantlist'
import { useProfile } from 'hooks/auth/useUser'
import { useParams } from 'react-router-dom'

export default function Profile() {
    const { username } = useParams()
    return (
        <>
            <QueryRenderer
                queries={[useProfile(username), useProfile()]}
                render={(user, loggedInUser) => {
                    const isProfileOwner = user.username === loggedInUser.username || username === undefined
                    return (
                        <>
                            <UserInfo user={user} isProfileOwner={isProfileOwner} />
                            <Collection isProfileOwner={isProfileOwner} />
                            <Wantlist isProfileOwner={isProfileOwner} />
                        </>
                    )
                }}
            />
        </>
    )
}
