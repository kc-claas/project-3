import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../utils/mutations";

const CreateClubPage: React.FC = () => {
    const [groupname, setGroupname] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [createGroup, { loading, error }] = useMutation(CREATE_GROUP);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createGroup({
                variables: {
                    groupname: groupname,
                    leader: "YOUR_LEADER_ID", // Replace with a dynamic leader ID
                    description: description,
                },
            });
            alert("Club created successfully!");
        } catch (err) {
            console.error(err);
            alert("Error creating club.");
        }
    };

    return (
        <div>
            <h1>Create a Club</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="groupname">Group Name:</label>
                    <input
                        id="groupname"
                        type="text"
                        value={groupname}
                        onChange={(e) => setGroupname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Club"}
                </button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default CreateClubPage;